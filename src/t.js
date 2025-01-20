import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaRobot, FaTimes } from 'react-icons/fa';
import Nav from "react-bootstrap/Nav";
import '../style.css';

const api_key = 'AIzaSyCPAXJvnOMK23-fvhA1XkaeBaZli9qqhgk';
const genAI = new GoogleGenerativeAI(api_key);

function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [model, setModel] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 350, height: 500 });
  const chatbotRef = useRef(null);  // Add this line
  
  useEffect(() => {
    async function initModel() {
      const initializedModel = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      setModel(initializedModel);
    }
    initModel();
  }, []);

  const toggleChatbot = (e) => {
    e.preventDefault();
    if (!isOpen) {
      setMessages([]);
    }
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const preprocessText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
               .replace(/\*\*\*(.*?)\*\*\*/g, '<em><strong>$1</strong></em>');
  };

  const isResumeRelatedQuestion = (question) => {
    const resumeKeywords = ['resume', 'cv', 'experience', 'skills', 'education', 'job', 'work', 'project', 'qualification'];
    return resumeKeywords.some(keyword => question.toLowerCase().includes(keyword));
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const processedText = preprocessText(inputText);
    const userMessage = { text: processedText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    try {
      let result;
      if (isResumeRelatedQuestion(processedText)) {
        // Use the backend for resume-related questions
        const response = await fetch('http://localhost:8000/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ context: processedText }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        result = { response: { text: () => data.analysis } };
      } else {
        // Use the client-side model for other questions
        result = await model.generateContent(processedText);
      }

      const botMessage = { text: preprocessText(result.response.text()), sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const startResize = (e) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    initialSize.current = {
      width: chatbotRef.current.offsetWidth,
      height: chatbotRef.current.offsetHeight,
      right: parseInt(chatbotRef.current.style.right) || 20
    };
  };

  const stopResize = () => {
    setIsResizing(false);
  };

  const handleResize = (e) => {
    if (!isResizing || !chatbotRef.current) return;

    const dx = resizeStartPos.current.x - e.clientX;
    const dy = e.clientY - resizeStartPos.current.y;

    let newWidth = initialSize.current.width + dx;
    let newHeight = initialSize.current.height + dy;

    const minWidth = 300;
    const minHeight = 400;
    const maxWidth = window.innerWidth - 40;
    const maxHeight = window.innerHeight - 80;

    newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
    newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    const newRight = initialSize.current.right - (newWidth - initialSize.current.width);

    chatbotRef.current.style.width = `${newWidth}px`;
    chatbotRef.current.style.height = `${newHeight}px`;
    chatbotRef.current.style.right = `${newRight}px`;
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', stopResize);
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);

  return (
    <>
      <Nav.Link onClick={toggleChatbot}>
        <FaRobot style={{ marginBottom: "2px" }} />
      </Nav.Link>
      {isOpen && (
        <div className="chatbot-panel" ref={chatbotRef}>
          <div className="chatbot-header">
            <h3>AI Assistant</h3>
            <button onClick={toggleChatbot} className="close-button">
              <FaTimes />
            </button>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.length === 0 ? (
                <div className="initial-message">
                  <p>Hello! I'm an AI assistant. I can answer questions about Pandurang's resume or any other topics. What would you like to know?</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender}`}>
                    <div className="message-content" dangerouslySetInnerHTML={{__html: message.text}}></div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
          <div className="resize-handle"></div>
        </div>
      )}
    </>
  );
}

export default ChatbotIcon;