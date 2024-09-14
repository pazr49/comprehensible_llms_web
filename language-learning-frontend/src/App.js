// Import necessary functions and components from React and react-router-dom libraries
import React, { useState, useEffect } from 'react'; // useState and useEffect are React hooks for managing state and side effects
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'; // Router components for handling navigation and routing

// The main App component which is the root of our React application
function App() {
  // State to hold the list of stories fetched from the backend
  const [stories, setStories] = useState([]); // useState hook initializes 'stories' to an empty array and provides a function to update it

  // useEffect hook runs after the component mounts (loads) to fetch data from the backend
  useEffect(() => {
    // Fetch a list of stories from the backend API endpoint
    fetch('http://127.0.0.1:5000/api/stories')
      .then((response) => response.json()) // Convert the response to JSON format
      .then((data) => setStories(data)) // Update the 'stories' state with the fetched data
      .catch((error) => console.error('Error fetching stories:', error)); // Catch and log any errors that occur during the fetch
  }, []); // The empty dependency array means this effect only runs once, when the component mounts

  // Render the main structure of the app, with routes for different pages
  return (
    <Router> {/* Router component that wraps around the entire app to enable routing */}
      <Routes> {/* Routes component that defines all the available routes in the app */}
        {/* Route for the home page, passing the list of stories to the Home component */}
        <Route path="/" element={<Home stories={stories} />} />
        {/* Route for a specific story page, which will display the story content based on the ID in the URL */}
        <Route path="/story/:id" element={<Story />} />
      </Routes>
    </Router>
  );
}

// Home component to display a list of story titles
function Home({ stories }) {
  // Render a list of stories
  return (
    <div>
      <h1>Select a Story</h1> {/* Title for the home page */}
      <ul> {/* Unordered list for displaying story links */}
        {stories.map((story) => ( // Loop through the 'stories' array and create a list item for each story
          <li key={story.id}> {/* Each list item needs a unique key, here it's the story ID */}
            {/* Link component for navigation, creates a clickable link to the story page */}
            <Link to={`/story/${story.id}`}>{story.title}</Link> {/* Link displays the story title */}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Story component to display the content of a selected story
function Story() {
  // State to hold the details of a specific story fetched from the backend
  const [story, setStory] = useState(null); // Initialize 'story' state to null (no story loaded yet)

  // useParams hook to extract the story ID from the URL
  const { id } = useParams(); // Extracts 'id' parameter from the URL to identify which story to load

  // useEffect hook runs when the component mounts or when the 'id' changes
  useEffect(() => {
    // Fetch the story details from the backend using the extracted story ID
    fetch(`http://127.0.0.1:5000/api/stories/${id}`) // Fetches data from the API endpoint for the specific story
      .then((response) => response.json()) // Convert the response to JSON format
      .then((data) => setStory(data)) // Update the 'story' state with the fetched story data
      .catch((error) => console.error('Error fetching story:', error)); // Catch and log any errors that occur during the fetch
  }, [id]); // Dependency array includes 'id' so this effect runs every time the 'id' changes

  // Render the story content or a loading message
  return (
    <div>
      {story ? ( // Conditional rendering: If 'story' is not null, display the story details
        <>
          <h1>{story.title}</h1> {/* Display the story title */}
          <p>{story.content}</p> {/* Display the story content */}
        </>
      ) : ( // If 'story' is null, display a loading message
        <p>Loading story...</p>
      )}
    </div>
  );
}

// Export the App component as the default export of this module
export default App;
