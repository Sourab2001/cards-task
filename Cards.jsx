import React from 'react';

function Card({ post, onRemove }) {
  const firstLetter = post?.title?.charAt(0).toUpperCase() || "A";
  return (
    <artical className="card">
      <div className="card-top">
        <div className="avatar no-icon">{firstLetter}</div>
        <div className="meta">
          <div className="name">Author {post.userId}</div>
          <div className='date'>31 Oct 2025</div>
        </div>
      </div>
      <h3 className="title">{post.title}</h3>
      <p className="body">
        {post.body.length>140 ? post.body.slice(0, 140) + "..": post.body}
      </p>
      <div className="card-footer">
        <button className='remove'
        onClick={onRemove}
        aria-label='Remove card'
        >
X
        </button>
      </div>
    </artical>
  );
}

export default Card;
