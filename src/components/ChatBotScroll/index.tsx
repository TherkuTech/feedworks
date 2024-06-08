import React from "react";


const ChatBotScroll = () =>{
    const scrollToChatbot = () => {
        const chatbotElement = document.getElementById('chat-bot');
        if (chatbotElement) {
            chatbotElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return(
        <>
            <div className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer text-2xl flex items-center justify-center hover:bg-blue-700"
                onClick={scrollToChatbot}>
                💬 Chat
            </div>
        </>
    )
}


export default ChatBotScroll
