import React, { useEffect, useState } from 'react';
import { ChatOllama } from "@langchain/ollama";
import { StringOutputParser } from "@langchain/core/output_parsers";
import Header from './components/Header';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './App.css';

function App() {
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [streamingResponse, setStreamingResponse] = useState([]);

  const fetchData = async (msg) => {
    try {
      const model = new ChatOllama({
        baseUrl: "http://localhost:11434",
        model: "llama3.1",
      });

      // Get the last 10 messages for context
      const recentMessages = messages.slice(-10).map(m => m.text).join("\n");
      const prompt = `${recentMessages}\nUser: ${msg}\nBot:`;

      const stream = await model
        .pipe(new StringOutputParser())
        .stream(prompt);
      
      let accumulatedResponse = '';
      let responseChunks = [];

      for await (const chunk of stream) {
        accumulatedResponse += chunk;
        responseChunks.push(chunk);
        setResponse(accumulatedResponse);
        setStreamingResponse([...responseChunks]); 
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: accumulatedResponse, sender: 'bot' } 
      ]);

      setResponse(''); 
      setStreamingResponse([]);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'user' }]);
    fetchData(message);
  };

  return (
    <div className="app">
      <Header />
      {(response!==''?<MessageList messages={[...messages, {text:response, sender:'bot'}]} />:<MessageList messages={[...messages]} /> )}
      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default App;
