// src/services/api.js

export const fetchStoryById = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/stories/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching story:', error);
      throw error;
    }
  };
  
  export const fetchNextChapter = async (requestData) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/next_chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching next chapter:', error);
      throw error;
    }
  };

  export const startStory = async (id, level, language) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/start_story/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level, language }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching story:', error);
      throw error;
    }
  };