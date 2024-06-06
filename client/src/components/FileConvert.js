import React, { useState } from 'react';
import axios from 'axios';
import './FileConvert.css';

const FileConvert = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [status, setStatus] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file ? file.name : '');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('Converting...');
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('/convert', formData, {
                responseType: 'blob',
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
        <div>
            <header className="header">
                <div className="logo">
                    <span className="logo-text">MAGIC</span>
                    <span className="logo-text-bold">PDF</span>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">Merge PDF</li>
                        <li className="nav-item">Split PDF</li>
                    </ul>
                </nav>
            </header>

            <main className="main">
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

export default FileConvert;
