import json
import logging
import os
import tempfile
import zipfile

from flask import request, send_file, jsonify, after_this_request
from werkzeug.utils import secure_filename
from docx2pdf import convert
from pdf2docx import Converter
from PyPDF2 import PdfMerger, PdfReader, PdfWriter


def convert_word_to_pdf_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and (file.filename.endswith('.docx') or file.filename.endswith('.doc')):
        filename = secure_filename(file.filename)

        # Create a temporary directory
        tmpdirname = tempfile.mkdtemp()
        input_path = os.path.join(tmpdirname, filename)
        file.save(input_path)

        output_path = os.path.splitext(input_path)[0] + '.pdf'

        try:
            convert(input_path, output_path)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

        # Extract the original filename without extension to use it in the download filename
        original_filename = os.path.splitext(file.filename)[0]
        download_filename = f"{original_filename}.pdf"

        @after_this_request
        def remove_file(response):
            try:
                os.remove(output_path)
                os.rmdir(tmpdirname)
            except Exception as e:
                print(f"Error removing or cleaning up files: {e}")
            return response

        return send_file(
            output_path,
            as_attachment=True,
            download_name=download_filename
        )

    return jsonify({'error': 'Invalid file type'}), 400


def convert_pdf_to_word_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        filename = secure_filename(file.filename)

        # Create a temporary directory
        tmpdirname = tempfile.mkdtemp()
        input_path = os.path.join(tmpdirname, filename)
        file.save(input_path)

        output_path = os.path.splitext(input_path)[0] + '.docx'

        try:
            cv = Converter(input_path)
            cv.convert(output_path, start=0, end=None)
            cv.close()
        except Exception as e:
            return jsonify({'error': str(e)}), 500

        # Extract the original filename without extension to use it in the download filename
        original_filename = os.path.splitext(file.filename)[0]
        download_filename = f"{original_filename}.docx"

        @after_this_request
        def remove_file(response):
            try:
                os.remove(output_path)
                os.rmdir(tmpdirname)
            except Exception as e:
                print(f"Error removing or cleaning up files: {e}")
            return response

        return send_file(
            output_path,
            as_attachment=True,
            download_name=download_filename
        )

    return jsonify({'error': 'Invalid file type'}), 400


def merge_pdfs():
    if 'files' not in request.files:
        return jsonify({'error': 'No files part'}), 400

    files = request.files.getlist('files')
    if not files or len(files) < 2:
        return jsonify({'error': 'At least two files required'}), 400

    for file in files:
        if not file.filename.endswith('.pdf'):
            return jsonify({'error': 'Invalid file type'}), 400

    try:
        tmpdirname = tempfile.mkdtemp()
        merger = PdfMerger()

        for file in files:
            filename = secure_filename(file.filename)
            file_path = os.path.join(tmpdirname, filename)
            file.save(file_path)
            merger.append(file_path)

        output_path = os.path.join(tmpdirname, 'merged.pdf')
        merger.write(output_path)
        merger.close()

        @after_this_request
        def remove_file(response):
            try:
                os.remove(output_path)
                os.rmdir(tmpdirname)
            except Exception as e:
                print(f"Error removing or cleaning up files: {e}")
            return response

        return send_file(output_path, as_attachment=True, download_name='merged.pdf')

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_pdf_pages():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        try:
            with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
                logging.debug("Saving file to temporary location.")
                file.save(tmp_file.name)
                logging.debug("File saved to %s", tmp_file.name)

                tmp_file_path = tmp_file.name

            reader = PdfReader(tmp_file_path)
            logging.debug("PDF file read successfully.")

            num_pages = len(reader.pages)
            logging.debug("Number of pages in PDF: %d", num_pages)

            os.remove(tmp_file_path)
            logging.debug("Temporary file deleted.")

            return jsonify({'numPages': num_pages}), 200
        except Exception as e:
            logging.error("Error processing PDF file: %s", e)
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid file type'}), 400


def split_pdf():
    if 'file' not in request.files or 'ranges' not in request.form:
        return jsonify({'error': 'Missing file or ranges'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        try:
            ranges = request.form['ranges']
            try:
                page_ranges = json.loads(ranges)
            except json.JSONDecodeError:
                return jsonify({'error': 'Invalid JSON in ranges'}), 400

            with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
                logging.debug("Saving file to temporary location.")
                file.save(tmp_file.name)
                logging.debug("File saved to %s", tmp_file.name)

                tmp_file_path = tmp_file.name

            reader = PdfReader(tmp_file_path)
            logging.debug("PDF file read successfully.")

            output_files = []
            for i, page_range in enumerate(page_ranges):
                writer = PdfWriter()
                start_page = int(page_range['from']) - 1
                end_page = int(page_range['to'])
                for page_num in range(start_page, end_page):
                    writer.add_page(reader.pages[page_num])

                output_path = f"split_file_{i}.pdf"
                with open(output_path, 'wb') as out_pdf:
                    writer.write(out_pdf)
                output_files.append(output_path)

            # Create a ZIP file containing the split PDFs
            zip_path = f"{tmp_file_path}_split_files.zip"
            with zipfile.ZipFile(zip_path, 'w') as zip_file:
                for output_file in output_files:
                    zip_file.write(output_file, os.path.basename(output_file))
                    os.remove(output_file)

            os.remove(tmp_file_path)
            logging.debug("Temporary file deleted.")

            return send_file(zip_path, as_attachment=True, download_name='split_files.zip')
        except Exception as e:
            logging.error("Error processing PDF file: %s", e)
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid file type'}), 400
