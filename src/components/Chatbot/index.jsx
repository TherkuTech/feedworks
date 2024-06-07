import { useState } from 'react';
import { RiSendPlane2Fill } from "react-icons/ri";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      const botMessage = { text: 'This is a fixed response.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-[3rem]">
      <p className="text-4xl">Ask your questions here?</p>
      <div className="w-[80%] rounded-md shadow-lg bg-slate-50 shadow-gray-400 h-[40rem] mt-[2rem] p-[1rem] relative">
        <div className="h-[89%] thin-scrollbar overflow-y-auto p-[1rem]">
          {messages.map((message, index) => (
            <div key={index} className={`p-[1rem] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block text-left max-w-[50%] p-[1rem] rounded-md ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex gap-x-[1rem] p-[1rem] bg-slate-50">
          <input
            type="text"
            placeholder="Enter your question here"
            className="flex-grow text-gray-900 border border-gray-300 bg-gray-300 p-[1rem] rounded-md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button
            className="bg-black text-gray-200 p-[1rem] rounded-md hover:bg-gray-800"
            onClick={handleSend}
          >
            <RiSendPlane2Fill className='text-xl text-white'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
