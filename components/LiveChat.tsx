'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Thank you for your message. Our team will get back to you shortly.', sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black/90 transition-colors z-40"
        >
          <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white border border-black/10 shadow-2xl flex flex-col z-50">
          <div className="bg-black text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-light tracking-wider uppercase">Customer Support</h3>
              <p className="text-xs text-white/70 font-light tracking-tight">We're here to help</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 text-sm font-light tracking-tight ${
                    msg.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-black/5 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/10 p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-black/10 text-sm font-light text-black tracking-tight bg-white focus:outline-none focus:border-black/30 transition-colors"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-black text-white hover:bg-black/90 transition-colors"
              >
                <Send className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


