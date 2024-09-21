// src/components/Story.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { startStory, fetchNextChapter } from '../services/api'; // Import the API service
import { fetchStoryById } from '../services/api'; // Import the API service
import './Story.css'; // Import the CSS file

const Story = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const [chapters, setChapters] = useState([]); // Array to store chapters
  const [sessionId, setSessionId] = useState(null); // Store session ID
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [language, setLanguage] = useState('english'); // State for selected language
  const [level, setLevel] = useState('A1'); // State for selected level
  const [storyStarted, setStoryStarted] = useState(false); // State to track if story has started
  const { id } = useParams();

  useEffect(() => {
    // Fetch the story title when the component mounts
    fetchStoryById(id)
      .then((data) => {
        setStoryTitle(data.story_title);
      })
      .catch((error) => {
        console.error('Error fetching story title:', error); // Log errors
      });
  }, [id]);
  

  const handleStartStory = () => {
    setIsLoading(true);
    startStory(id, level, language)
      .then((data) => {
        console.log('Story fetched:', data.new_chapter); // Log the fetched story data
        setSessionId(data.session_id);
        setChapters([data.new_chapter]); // Initialize chapters array with first chapter
        setFeedbackVisible(true);
        setIsLoading(false);
        setStoryStarted(true); // Set story started to true
      })
      .catch((error) => {
        console.error('Error fetching story:', error); // Log errors
        setIsLoading(false);
      });
  };

  const handleFeedback = (feedback) => {
    console.log(`User feedback: ${feedback}`); // Log user feedback

    setIsLoading(true); // Start loading
    const requestData = {
      session_id: sessionId,
      feedback: feedback,
    };

    console.log('Sending request for next chapter with data:', requestData); // Log request data

    fetchNextChapter(requestData)
      .then((data) => {
        console.log('Next chapter fetched:', data); // Log the fetched next chapter data
        setChapters([...chapters, data.new_chapter]); // Append new chapter
        setIsLoading(false); // Finish loading
      })
      .catch((error) => {
        console.error('Error fetching next chapter:', error); // Log errors
        setIsLoading(false); // Finish loading even if there's an error
      });
  };

  return (
    <div className="story-container">
      <h1 className="story-title">{storyTitle}</h1>
      {!storyStarted && (
        <>
          <div className="dropdowns">
            <label>
              Language:
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="spanish">Spanish</option>
              </select>
            </label>
            <label>
              Level:
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </label>
            <button onClick={handleStartStory} disabled={isLoading}>
              {isLoading ? 'Starting...' : 'Start'}
            </button>
          </div>
          <p className="prompt-message">Please select the language and level to get started.</p>
        </>
      )}
      {storyStarted && (
        <>
          {chapters.map((chapter, index) => (
            <p key={index} className="chapter">{chapter}</p> // Render each chapter
          ))}
          {feedbackVisible && (
            <>
              {isLoading && <p className="loading">Loading next chapter...</p>}
              <div className="feedback-buttons">
                <button
                  onClick={() => handleFeedback('too easy')}
                  disabled={isLoading}
                >
                  Too Easy
                </button>
                <button
                  onClick={() => handleFeedback('just right')}
                  disabled={isLoading}
                >
                  Just Right
                </button>
                <button onClick={() => handleFeedback('too hard')} disabled={isLoading}>
                  Too Hard
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Story;