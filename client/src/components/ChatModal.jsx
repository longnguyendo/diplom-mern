import { useState, useEffect, useRef } from 'react';
import { Modal, Button, TextInput, Avatar, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react';
import { HiOutlineChatAlt2, HiOutlinePaperAirplane, HiOutlineX } from 'react-icons/hi';
import axios from 'axios';
import { useSelector } from 'react-redux'; // if using Redux

const ChatModal = () => {
    
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user); // if using Redux

  // Sample initial bot message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: 'Hello! I\'m your blog assistant. How can I help you today?',
        sender: 'bot'
      }
    ]);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const res = await axios.post(`/api/chatbot/reply/${currentUser._id}`, { 
        message 
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if needed
          // 'Authorization': `Bearer ${currentUser.token}`
        }
      });

      const botMessage = {
        id: Date.now() + 1,
        text: res.data.reply,
        sender: 'bot'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat button */}
      { currentUser && <div className="fixed z-50 bottom-6 right-6">
        <Button
          gradientDuoTone="purpleToBlue"
          pill
          onClick={() => setOpen(true)}
          className="p-3 rounded-full shadow-lg"
        >
          <HiOutlineChatAlt2 className="w-6 h-6" />
        </Button>
      </div>}

      {/* Chat modal */}
      <Modal show={open} onClose={() => setOpen(false)} position="bottom-right" size="md">
        <ModalHeader className="p-4 border-b">
          <div className="flex items-center">
            <Avatar
              alt="Chatbot"
              img="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg" // Replace with your bot avatar
              rounded
              size="md"
            />
            <h3 className="ml-2 text-lg font-semibold">Blog Assistant AI</h3>
          </div>
          {/* <Button
            color="gray"
            size="xs"
            onClick={() => setOpen(false)}
            className="ml-auto"
          >
            <HiOutlineX className="w-4 h-4" />
          </Button> */}
        </ModalHeader>
        <ModalBody className="p-0">
          <div className="p-4 space-y-4 overflow-y-auto h-80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 text-gray-800 bg-gray-200 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ModalBody>
        <ModalFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full">
            <TextInput
              type="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              className="ml-2"
              disabled={isLoading || !message.trim()}
            >
              <HiOutlinePaperAirplane className="w-5 h-5" />
            </Button>
          </form>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ChatModal;