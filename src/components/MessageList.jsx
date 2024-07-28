import React from 'react';
import Message from './Message';
import { useRef, useEffect } from 'react';

function MessageList({ messages }) {
 const messageListRef = useRef(null);

 useEffect(() => {
    // Scroll to the bottom of the message list whenever new messages are added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list" ref={messageListRef}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
