import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
// import tingSound from './ting.mp3';
import './Chat.css'; // Assuming your CSS file is in the same directory

const ChatComponent = () => {
  const socket = useRef(null);
  const messageContainer = useRef(null);
  const messageInput = useRef(null);
//   const audio = new Audio(tingSound);

  useEffect(() => {
    socket.current = io('http://localhost:5002');

    const name = prompt('Enter your name to join');
    socket.current.emit('new-user-joined', name);

    socket.current.on('user-joined', (userName) => {
      append(`${userName} joined the chat`, 'right');
    });

    socket.current.on('recieve', (data) => {
      append(`${data.name}: ${data.message}`, 'left');
    });

    socket.current.on('left', (userName) => {
      append(`${userName} left the chat`, 'left');
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = messageInput.current.value;
    append(`You: ${message}`, 'right');
    socket.current.emit('send', message);
    messageInput.current.value = '';
  };

  const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.current.appendChild(messageElement);
    // if (position === 'left') {
    //   audio.play();
    // }

    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  };

  return (
    <div className='ChatBody'>
      {/* <nav>
        <img className="logo" src="/1.png" alt="" />
      </nav> */}

      <div className="Chatcontainer" ref={messageContainer}></div>

      <div className="Chatsend">
        <form onSubmit={handleSubmit} id="Chat-send-container">
          <input type="text" name="messageInp" ref={messageInput} />
          <button className="Chat-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
