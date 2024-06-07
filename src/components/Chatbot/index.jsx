import axios from 'axios';
import { useEffect, useState } from 'react';
import { RiSendPlane2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { feedback_analysis } = useSelector((store) => store.feedback_reducer);

  function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const token = getCookieValue('token');

  useEffect(() => {
    console.log("Feedback Analysis from chat:", feedback_analysis);
  }, [feedback_analysis]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setLoading(true);

      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}llm/feedchat`, {
          prompt: userMessage.text,
          data: feedback_analysis
        },
        {
          headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });

        if (res) {
          const botMessage = { text: `${res.data.message}`, sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      } catch (err) {
        console.log(err.message);
        const botMessage = { text: 'Sorry, I am not able to process your request.', sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-[3rem]">
      <p className="text-4xl">Ask your questions here?</p>
      <div className={`${messages.length > 0?'w-full rounded-md shadow-b-lg bg-slate-50 shadow-gray-400 h-[40rem] mt-[2rem] p-[1rem] relative':'w-full rounded-md shadow-b-lg bg-slate-50 shadow-gray-400 max-h-[40rem] mt-[2rem] p-[1rem] relative' }`}>
        <div className="h-[89%] thin-scrollbar overflow-y-auto p-[1rem]">
          {messages.map((message, index) => (
            <div key={index} className={`p-[1rem] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block text-left max-w-[50%] p-[1rem] rounded-md ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                {message.text}
              </span>
            </div>
          ))}
          {loading && (
            <div className="p-[1rem] text-left">
              <span className="inline-block text-left max-w-[50%] p-[1rem] rounded-md bg-gray-300 shimmer"></span>
            </div>
          )}
        </div>
        <div className={`${messages.length>0?'absolute bottom-0 left-0 right-0 flex gap-x-[1rem] p-[1rem] bg-slate-50':'absolute top-0 left-0 right-0 flex gap-x-[1rem]  bg-slate-50'}`}>
          <input
            type="text"
            placeholder="Enter your question here"
            className="flex-grow text-gray-900 border border-gray-300 bg-gray-300 p-[1.2rem] rounded-md"
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
            <RiSendPlane2Fill className='text-xl text-white' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
