import os
import tempfile
from flask import request, send_file, jsonify, after_this_request
from werkzeug.utils import secure_filename
from docx2pdf import convert
from pdf2docx import Converter
from PyPDF2 import PdfMerger
import pythoncom


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
            pythoncom.CoInitialize()
            convert(input_path, output_path)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            pythoncom.CoUninitialize()

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
            pythoncom.CoInitialize()
            cv = Converter(input_path)
            cv.convert(output_path, start=0, end=None)
            cv.close()
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            pythoncom.CoUninitialize()

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