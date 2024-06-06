import os
import tempfile
from flask import request, send_file, jsonify, after_this_request
from werkzeug.utils import secure_filename
from docx2pdf import convert
import pythoncom

def convert_file():
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
