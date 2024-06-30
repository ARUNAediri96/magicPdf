import React, { useState } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MergePDF.css';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MergePDF = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('Merging...');
        setProgress(0);

        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append('files', file);
        });

        try {
            const response = await axios.post(`${BASE_URL}/merge_pdfs`, formData, {
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

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'merged.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setStatus('Files merged successfully.');
        } catch (error) {
            setStatus('File merge failed.');
        }
    };

    const removeFile = (index) => {
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="merge-pdf-container">
            <main className="main merge-pdf-main">
                <h1 className="file-merge-title">Merge PDF Files</h1>
                <p className="file-merge-subtitle">Combine multiple PDF files into one.</p>

                <form onSubmit={handleSubmit} className="file-merge-form">
                    <label htmlFor="file-upload" className="file-upload-label">
                        <input type="file" id="file-upload" onChange={handleFileChange} accept=".pdf" className="file-input" multiple />
                        Select PDF files
                        <span className="upload-icon">&#8593;</span>
                    </label>
                    <button type="submit" className="merge-button">Merge</button>
                </form>
                {selectedFiles.length > 0 && (
                    <div className="selected-files-container">
                        <p className="selected-files-title">Selected Files:</p>
                        <ul className="selected-files-list">
                            {selectedFiles.map((file, index) => (
                                <li key={index} className="selected-file-item">
                                    {file.name}
                                    <button type="button" className="remove-file-button" onClick={() => removeFile(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {status === 'Merging...' && (
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
        </div>
    );
};

export default MergePDF;
