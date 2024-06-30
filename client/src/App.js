// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WordToPdfConvert from './components/WordToPdfConvert';
import PdfToWordConvert from './components/PdfToWordConvert';
import MergePDF from './components/MergePDF'
import SplitPDF from './components/SplitPDF'
import Home from './components/Home';
import Header from './components/Header'; // Import the Header component

const App = () => {
    return (
        <Router>
            <Header /> {/* Add the Header component here */}
            <Routes>
                <Route path="/pdf_to_word" element={<PdfToWordConvert />} />
                <Route path="/word_to_pdf" element={<WordToPdfConvert />} />
                <Route path="/merge_pdf" element={<MergePDF />} />
                <Route path="/split_pdf" element={<SplitPDF />} />
                <Route path="/" element={<Home />} /> {/* Default home route */}
            </Routes>
        </Router>
    );
};

export default App;
