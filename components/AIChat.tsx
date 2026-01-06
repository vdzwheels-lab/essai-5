import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Bonjour. Je suis l'interface technique VDZ. Posez-moi vos questions sur les profils de jante, l'aérodynamisme ou les montages sur mesure.", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Format history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await sendMessageToGemini(history, userMsg.text);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div className={`pointer-events-auto bg-black/90 backdrop-blur-md border border-red-900/30 w-80 md:w-96 rounded-tl-2xl rounded-tr-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-300 overflow-hidden ${isOpen ? 'h-96 opacity-100 mb-4' : 'h-0 opacity-0'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 to-black p-3 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-white" />
            <span className="font-orbitron text-xs font-bold text-white tracking-widest">CŒUR TECH VDZ</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-red-900">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg text-xs font-rajdhani font-medium leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-red-900/80 text-white rounded-br-none border border-red-700' 
                  : 'bg-zinc-800/80 text-gray-200 rounded-bl-none border border-zinc-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-800/80 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin text-red-500" />
                <span className="text-xs text-gray-400 font-rajdhani">Traitement...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="absolute bottom-0 w-full p-2 bg-black border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Question sur les specs..."
            className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-xs p-2 focus:outline-none focus:border-red-800 font-rajdhani"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-red-900 hover:bg-red-800 text-white p-2 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-900 to-black border border-red-500/30 shadow-[0_0_20px_rgba(139,0,0,0.4)] hover:shadow-[0_0_30px_rgba(139,0,0,0.8)] transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20"></div>
        <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};