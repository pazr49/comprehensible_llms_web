// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Story from './components/Story';
import { fetchStoryById } from './services/api'; // Import the API service

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/stories')
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error('Error fetching stories:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home stories={stories} />} />
        <Route path="/story/:id" element={<Story />} />
      </Routes>
    </Router>
  );
}

export default App;
