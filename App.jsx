import React, { useState, useEffect } from "react";
import axios from "axios";
import CardsSection from "./Components/CardsSection";
import FeedbackForm from "./Components/FeedbackForm";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

useEffect(() => {
  let isMounted = true;
  const timer = setTimeout(() => {
    if (isMounted) setLoading(false);
  }, 2000); 

  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (isMounted) {
        setPosts(response.data || []);
      }
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      if (isMounted) setPosts([]);
    });

  return () => {
    isMounted = false;
    clearTimeout(timer);
  };
}, []);


  const removeCardById = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="app">
      <header className="header">
        <div className="title">Cards</div>
        <div className="controls">
          <button
            className="btn toggle"
            onClick={() => setShowCards((s) => !s)}
            aria-pressed={showCards}
          >
            <span className="icon">¥</span>
            <div className="label">View toggle</div>
          </button>

          <button
            className="btn feedback"
            onClick={() => setShowFeedback(true)}
          >
            <div className="label">Have Feedback</div>
            <div className="sub">We are Listening!</div>
          </button>
        </div>
      </header>

      <main className="main">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : showCards ? (
          <CardsSection posts={posts} onRemove={removeCardById} />
        ) : (
          <div className="hidden-msg">Cards are hidden. Toggle to view.</div>
        )}
      </main>

      {showFeedback && (
        <FeedbackForm onclose={() => setShowFeedback(false)} />
      )}

      <footer className="footer">
        <div>Cards - task</div>
      </footer>
    </div>
  );
};

export default App;
