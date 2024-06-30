import React, { useState } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PdfToWordConvert.css';

const BASE_URL = process.env.BACKEND_BASE_URL;

const PDFtoWordConvert = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file ? file.name : '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('Converting...');
        setProgress(0);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(`${BASE_URL}/convert_pdf_to_word`, formData, {
                responseType: 'blob',
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader('content-length') ||
                          progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength !== null) {
                        setProgress(Math.round((progressEvent.loaded * 100) / totalLength));
                    }
                },
            });

            const originalFileName = selectedFile.name;
            const wordFileName = originalFileName.replace(/\.[^/.]+$/, ".docx");

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = wordFileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setStatus('File converted successfully.');
        } catch (error) {
            setStatus('File conversion failed.');
        }
    };

    return (
        <div className="pdf-to-word-container">
            <main className="main pdf-to-word-main">
                <h1 className="file-convert-title">Convert PDF to Word</h1>
                <p className="file-convert-subtitle">Make PDF files editable by converting them to Word documents.</p>

                <form onSubmit={handleSubmit} className="file-convert-form">
                    <label htmlFor="file-upload" className="file-upload-label">
                        <input type="file" id="file-upload" onChange={handleFileChange} accept=".pdf" className="file-input" />
                        Select PDF files
                        <span className="upload-icon">&#8593;</span>
                    </label>
                    <button type="submit" className="convert-button">Convert</button>
                    {selectedFileName && (
                        <p className="selected-file">Selected File: {selectedFileName}</p>
                    )}
                </form>
                {status === 'Converting...' && (
                    <div className="progress-container">
                        <ProgressBar
                            now={progress}
                            label={`${progress}%`}
                            variant="info"
                            className="progress-bar"
                        />
                    </div>
                )}
                <p className="status-message">{status}</p>
            </main>

            <footer className="footer">
                <div className="taskbar">
                    <img src="edge-icon.png" alt="Microsoft Edge" className="taskbar-icon" />
                </div>
            </footer>
        </div>
    );
};

export default PDFtoWordConvert;
