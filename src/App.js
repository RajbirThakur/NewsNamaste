import './App.css';

import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from "react-top-loading-bar";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  const [progress, setProgresss] = useState(0);
  const setProgress = (progres)=>{
    setProgresss(progres);
  }

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={progress}
            height={3}
          />
          <Routes>
            <Route path="/" element={<News key="general" setProgress={setProgress} category="general" />} />
            <Route path="/entertainment" element={<News key="entertainment" setProgress={setProgress} category="entertainment" />} />
            <Route path="/health" element={<News key="health" setProgress={setProgress} category="health" />} />
            <Route path="/cricket" element={<News key="cricket" setProgress={setProgress} category="cricket" />} />
            <Route path="/technology" element={<News key="technology" setProgress={setProgress} category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
}

