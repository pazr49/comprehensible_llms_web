// src/components/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ stories }) => {
  return (
    <div>
      <h1>Select a Story</h1>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link to={`/story/${story.id}`}>{story.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
