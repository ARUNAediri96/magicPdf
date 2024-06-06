// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import FileConvert from './components/FileConvert';
// import Home from './components/Home';
//
// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/word_to_pdf" element={<FileConvert />} />
//                 <Route path="/" element={<Home />} /> {/* Default home route */}
//             </Routes>
//         </Router>
//     );
// };
//
// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileConvert from './components/FileConvert';
import Home from './components/Home';
import Header from './components/Header'; // Import the Header component

const App = () => {
    return (
        <Router>
            <Header /> {/* Add the Header component here */}
            <Routes>
                <Route path="/word_to_pdf" element={<FileConvert />} />
                <Route path="/" element={<Home />} /> {/* Default home route */}
            </Routes>
        </Router>
    );
};

export default App;
