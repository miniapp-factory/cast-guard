"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm CastGuard, your friendly OSINT investigator. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate a response (placeholder)
    const botResponse: Message = {
      role: "assistant",
      content: `You said: "${userMsg.content}". (This is a placeholder response.)`,
    };
    setMessages((prev) => [...prev, botResponse]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <div className="flex flex-col gap-2 h-64 overflow-y-auto p-4 border rounded-md bg-background">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}>
            <div className={`p-2 rounded-md ${msg.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md bg-background"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
