'use client';

import { useState, useEffect } from 'react';
import { FaSearch, FaPaperPlane } from 'react-icons/fa';

type Message = { id: number; text: string; sender: string };
type User = { id: number; name: string; avatar: string };

const ChatUI = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users] = useState([
    { id: 1, name: 'John Doe', avatar: 'https://picsum.photos/50/50?random=1' },
    { id: 2, name: 'Jane Smith', avatar: 'https://picsum.photos/50/50?random=2' },
    { id: 3, name: 'Bob Johnson', avatar: 'https://picsum.photos/50/50?random=3' },
  ]);

  useEffect(() => {
    
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() && selectedUser) {
      const tempId = Date.now();
      const newMessage = {
        text: message,
        sender: 'me',
        id: tempId,
      };
  
      // 1. Cập nhật UI ngay lập tức
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
  
      // 2. Gửi về server
      try {
        const res = await fetch('http://localhost:8000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Nếu Laravel có dùng sanctum hoặc auth, thêm Authorization ở đây
          },
          body: JSON.stringify({
            message,
            sender: 'me',
          }),
        });
  
        if (!res.ok) {
          throw new Error('Không gửi được')
        };
  
        const result = await res.json();
        console.log('Server xác nhận gửi thành công:', result);
      } catch (err) {
        console.error('Gửi thất bại:', err);
        // Có thể hiển thị lại UI lỗi nếu muốn
      }
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      {/* Left column: User list */}
      <div className="w-1/4 bg-gray-100 bg-opacity-90 border-r border-gray-300 flex flex-col min-w-1/4 max-w-xs">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users"
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
              aria-label="Search users"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {users.map(user => (
            <div
              key={user.id}
              className={`flex items-center p-3 border-b border-gray-200 hover:bg-gray-200 cursor-pointer transition duration-150 ease-in-out ${selectedUser?.id === user.id ? 'bg-indigo-200' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3 transition duration-150 ease-in-out transform hover:scale-110"
              />
              <span className="font-medium text-gray-700">{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right column: Chat conversation */}
      <div className="flex-1 flex flex-col bg-gray-50 bg-opacity-90">
        {selectedUser ? (
          <>
            <div className="bg-gray-100 bg-opacity-90 border-b border-gray-300 p-4 flex items-center">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-medium text-gray-700">{selectedUser.name}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === 'me' ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-100 bg-opacity-90 border-t border-gray-300 p-4">
              <div className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUI;
