import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [content, setContent] = useState('');
  const textareaRef = useRef();

  useEffect(() => {
    socket.on('init', data => setContent(data));
    socket.on('update', data => setContent(data));
    return () => {
      socket.off('init');
      socket.off('update');
    };
  }, []);

  const handleChange = e => {
    const newVal = e.target.value;
    setContent(newVal);
    socket.emit('edit', newVal);
  };

  return (
    <div className="container">
      <h1>Real‑Time Collaborative Editor</h1>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        placeholder="Start typing..."
      />
    </div>
  );
}

export default App;