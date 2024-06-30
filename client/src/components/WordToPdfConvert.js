import React, { useState } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WordToPdfConvert.css';

const WordToPdfConvert = () => {
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
            const response = await axios.post('/convert_word_to_pdf', formData, {
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
            const pdfFileName = originalFileName.replace(/\.[^/.]+$/, ".pdf");

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = pdfFileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setStatus('File converted successfully.');
        } catch (error) {
            setStatus('File conversion failed.');
        }
    };

    return (
        <div className="word-to-pdf-container">
            <main className="main word-to-pdf-main">
                <h1 className="file-convert-title">Convert WORD to PDF</h1>
                <p className="file-convert-subtitle">Make DOC and DOCX files easy to read by converting them to PDF.</p>

                <form onSubmit={handleSubmit} className="file-convert-form">
                    <label htmlFor="file-upload" className="file-upload-label">
                        <input type="file" id="file-upload" onChange={handleFileChange} accept=".docx,.doc" className="file-input" />
                        Select WORD files
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

export default WordToPdfConvert;

