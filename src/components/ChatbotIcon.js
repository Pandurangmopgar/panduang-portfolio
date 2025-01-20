import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaRobot, FaTimes, FaExpand, FaCompress } from 'react-icons/fa';
import Nav from "react-bootstrap/Nav";
import '../style.css';
import resumePart1 from '../Assets/resume_part_1.png';
import resumePart2 from '../Assets/resume_part_2.png';

const api_key = process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyCPAXJvnOMK23-fvhA1XkaeBaZli9qqhgk';
const genAI = new GoogleGenerativeAI(api_key);

// System prompt to guide the AI's behavior
const SYSTEM_PROMPT = `You are an AI assistant analyzing a resume. Your role is to:
1. Provide accurate information about the person's experience, skills, and qualifications
2. Answer questions based on the resume content
3. Be helpful and professional in your responses
4. If asked about something not in the resume, clearly state that you can only speak to information contained in the resume`;

function ChatbotIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [model, setModel] = useState(null);
  const [resumeContext, setResumeContext] = useState('');
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const initialSize = useRef({ width: 350, height: 500 });
  const chatbotRef = useRef(null);

  // Function to convert image to base64
  const fileToGenerativePart = async (imagePath) => {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return {
      inlineData: {
        data: await convertBlobToBase64(blob),
        mimeType: 'image/png'
      }
    };
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    async function initChat() {
      try {
        setIsLoading(true);

        // Initialize model with Gemini 2.0 Flash
        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.0-flash-exp",
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        });

        setModel(model);

        // Convert both resume parts to generative parts
        const imagePart1 = await fileToGenerativePart(resumePart1);
        const imagePart2 = await fileToGenerativePart(resumePart2);

        // Send both parts to Gemini with system prompt
        const parts = [
          { text: SYSTEM_PROMPT },
          {
            text: "Here is part 1 of the resume to analyze:"
          },
          imagePart1,
          {
            text: "Here is part 2 of the resume to analyze. Please combine information from both parts to provide complete answers:"
          },
          imagePart2
        ];

        try {
          const result = await model.generateContent({
            contents: [{ 
              role: "user", 
              parts
            }]
          });
          const response = await result.response;
          setResumeContext(response.text()); // Store the context
          setIsLoading(false);
        } catch (error) {
          console.error('Error processing resume images:', error);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error initializing chat:', error);
        setIsLoading(false);
      }
    }

    if (isOpen) {
      initChat();
    }
  }, [isOpen]);

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

  const handleSendMessage = async () => {
    if (inputText.trim() === '' || !model || isLoading) return;

    const processedText = preprocessText(inputText);
    const userMessage = { text: processedText, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    setIsLoading(true);
    try {
      // Include system prompt and context with each message
      const result = await model.generateContent({
        contents: [
          { 
            role: "user",
            parts: [
              { text: SYSTEM_PROMPT },
              { text: "Resume Context: " + resumeContext },
              { text: "Based on the above resume, please answer: " + processedText }
            ]
          }
        ]
      });
      const response = await result.response;
      const botMessage = { text: preprocessText(response.text()), sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
    setIsLoading(false);
  };

  const startResize = (e) => {
    e.preventDefault();
    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    const rect = chatbotRef.current.getBoundingClientRect();
    initialSize.current = {
      width: rect.width,
      height: rect.height,
      right: window.innerWidth - rect.right,
      top: rect.top,
      left: rect.left
    };
  };
  const stopResize = () => {
    setIsResizing(false);
  };
  const handleResize = useCallback((e) => {
    if (!isResizing || !chatbotRef.current) return;

    const dx = resizeStartPos.current.x - e.clientX;
    const dy = e.clientY - resizeStartPos.current.y;

    let newWidth = initialSize.current.width + dx;
    let newHeight = initialSize.current.height + dy;

    const minWidth = 300;
    const minHeight = 400;
    const maxWidth = initialSize.current.left + initialSize.current.width;
    const maxHeight = window.innerHeight - initialSize.current.top - 20;

    newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
    newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    const newLeft = initialSize.current.left - (newWidth - initialSize.current.width);

    chatbotRef.current.style.width = `${newWidth}px`;
    chatbotRef.current.style.height = `${newHeight}px`;
    chatbotRef.current.style.left = `${newLeft}px`;
    // Right and top positions remain unchanged
  }, [isResizing]);
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', stopResize);
    }
    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing, handleResize]);
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      chatbotRef.current.style.width = '100%';
      chatbotRef.current.style.height = '100%';
      chatbotRef.current.style.top = '0';
      chatbotRef.current.style.left = '0';
      chatbotRef.current.style.right = '0';
      chatbotRef.current.style.bottom = '0';
    } else {
      chatbotRef.current.style.width = `${initialSize.current.width}px`;
      chatbotRef.current.style.height = `${initialSize.current.height}px`;
      chatbotRef.current.style.top = `${initialSize.current.top}px`;
      chatbotRef.current.style.left = `${initialSize.current.left}px`;
      chatbotRef.current.style.right = `${initialSize.current.right}px`;
      chatbotRef.current.style.bottom = 'auto';
    }
  };

  return (
    <>
      <Nav.Link onClick={toggleChatbot}>
        <FaRobot style={{ marginBottom: "2px" }} />
      </Nav.Link>
      {isOpen && (
        <div className={`chatbot-panel ${isFullscreen ? 'fullscreen' : ''}`} ref={chatbotRef}>
          <div className="chatbot-header">
            <h3>AI Assistant</h3>
            <div className="chatbot-controls">
              <button onClick={toggleFullscreen} className="fullscreen-button">
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
              <button onClick={toggleChatbot} className="close-button">
                <FaTimes />
              </button>
            </div>
          </div>
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.length === 0 ? (
                <div className="initial-message">
                  <p>Hello! I'm an AI assistant. I can answer questions about The Portfolio. What would you like to know?</p>
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
          <div className="resize-handle" onMouseDown={startResize}></div>
        </div>
      )}
    </>
  );
}

export default ChatbotIcon;