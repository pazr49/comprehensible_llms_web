// src/components/Story.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { startStory, fetchNextChapter } from '../services/api'; // Import the API service
import './Story.css'; // Import the CSS file

const Story = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const [chapters, setChapters] = useState([]); // Array to store chapters
  const [sessionId, setSessionId] = useState(null); // Store session ID
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { id } = useParams();

  useEffect(() => {
    console.log(`Fetching story for ID: ${id}`); // Log the story ID being fetched
    startStory(id)
      .then((data) => {
        console.log('Story fetched:', data.new_chapter); // Log the fetched story data
        setSessionId(data.session_id);
        setStoryTitle(data.story_title);
        setChapters([...chapters, data.new_chapter]); // Initialize chapters array with first chapter
        setFeedbackVisible(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching story:', error); // Log errors
      });
      setIsLoading(false);
  }, [id]);

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
      {storyTitle ? (
        <>
          <h1 className="story-title">{storyTitle}</h1>
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
      ) : (
        <p className="loading">Loading story...</p>
      )}
    </div>
  );
};

export default Story;
