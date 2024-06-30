import React, { useState } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SplitPDF.css';

const BASE_URL = process.env.BACKEND_BASE_URL;

const SplitPDF = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageRanges, setPageRanges] = useState([{ from: '', to: '' }]);
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState(0);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Get the number of pages in the PDF file
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}/get_pdf_pages`, formData);
            setNumPages(response.data.numPages);
        } catch (error) {
            console.error('Failed to get the number of pages:', error);
        }
    };

    const handleRangeChange = (index, field, value) => {
        const newPageRanges = [...pageRanges];
        newPageRanges[index][field] = value;
        setPageRanges(newPageRanges);
    };

    const addMoreRanges = () => {
        setPageRanges([...pageRanges, { from: '', to: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('Splitting...');
        setProgress(0);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('ranges', JSON.stringify(pageRanges));

        try {
            const response = await axios.post(`${BASE_URL}/split_pdf`, formData, {
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
            a.download = 'split_files.zip';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            setStatus('File split successfully.');
        } catch (error) {
            setStatus('File split failed.');
        }
    };

    return (
        <div className="split-pdf-container">
            <main className="main split-pdf-main">
                <h1 className="file-split-title">Split PDF File</h1>
                <p className="file-split-subtitle">Split a PDF file into multiple parts.</p>

                <form onSubmit={handleSubmit} className="file-split-form">
                    <label htmlFor="file-upload" className="file-upload-label">
                        <input type="file" id="file-upload" onChange={handleFileChange} accept=".pdf" className="file-input" />
                        Select PDF file
                        <span className="upload-icon">&#8593;</span>
                    </label>

                    {selectedFile && (
                        <div className="selected-file">
                            <p>Selected file: {selectedFile.name}</p>
                            {numPages !== null && <p>Number of pages: {numPages}</p>}
                        </div>
                    )}

                    {pageRanges.map((range, index) => (
                        <div key={index} className="page-range-inputs">
                            <label htmlFor={`from-${index}`} className="page-range-label">
                                From:
                                <input
                                    type="number"
                                    id={`from-${index}`}
                                    value={range.from}
                                    onChange={(e) => handleRangeChange(index, 'from', e.target.value)}
                                    className="page-range-input"
                                    min="1"
                                    max={numPages}
                                />
                            </label>
                            <label htmlFor={`to-${index}`} className="page-range-label">
                                To:
                                <input
                                    type="number"
                                    id={`to-${index}`}
                                    value={range.to}
                                    onChange={(e) => handleRangeChange(index, 'to', e.target.value)}
                                    className="page-range-input"
                                    min="1"
                                    max={numPages}
                                />
                            </label>
                        </div>
                    ))}

                    <button type="button" onClick={addMoreRanges} className="add-more-button">
                        Add more ranges
                    </button>

                    <button type="submit" className="split-button">Split</button>
                </form>
                {status === 'Splitting...' && (
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

export default SplitPDF;
