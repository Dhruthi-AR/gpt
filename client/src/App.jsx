import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Github, Plus, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your custom Kimi-powered GPT. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        messages: [...messages, userMessage]
      });

      setMessages(prev => [...prev, response.data.message]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please check if the backend is running and your API key is valid.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <aside className="w-64 glass border-r flex flex-col p-4 hidden md:flex">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Bot size={20} color="white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Kimi GPT</span>
        </div>

        <button
          onClick={() => setMessages([{ role: 'assistant', content: 'Hello! I am your custom Kimi-powered GPT. How can I help you today?' }])}
          className="flex items-center gap-2 w-full p-3 rounded-xl border border-dashed border-white/20 hover:bg-white/5 transition-colors mb-6"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>

        <div className="flex-1 overflow-y-auto space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2">History</div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-sm cursor-pointer border border-white/10">
            <MessageSquare size={16} />
            <span className="truncate">Current Project Chat</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
          <div className="flex items-center gap-3 p-2 text-sm text-slate-400 hover:text-white cursor-pointer transition-colors">
            <Github size={18} />
            <span>View Source</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative bg-slate-950/20">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b glass z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-slate-300">Kimi-K2.5 Model Online</span>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6 pb-24">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant'
                    ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30'
                    : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                    {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${msg.role === 'assistant'
                    ? 'bg-white/5 border border-white/10 text-slate-200'
                    : 'bg-violet-600 text-white shadow-lg shadow-violet-900/20'
                    }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-2xl p-2 pl-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message Kimi GPT..."
                className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 text-sm py-2"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-violet-600 flex items-center justify-center transition-all shrink-0"
              >
                <Send size={18} color="white" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-500 mt-3">
              Kimi GPT can make mistakes. Verify important info.
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .glass {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(12px);
          border-color: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
};

export default App;
