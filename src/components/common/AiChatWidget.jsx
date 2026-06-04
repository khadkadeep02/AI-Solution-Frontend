import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/api";
const MAX_WORDS = 120;

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hi, I am here to help.",
  },
];

function getErrorMessage(error) {
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  return "Unable to reach the assistant right now.";
}

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [prompt, setPrompt] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || sending) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedPrompt,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setPrompt("");
    setSending(true);

    try {
      const response = await axios.post(`${API_BASE}/ai/ask/`, {
        prompt: trimmedPrompt,
        max_words: MAX_WORDS,
      });

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: response.data?.response || "I could not generate a response.",
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          text: getErrorMessage(error),
          tone: "error",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] text-left sm:bottom-6 sm:right-6">
      {open && (
        <section
          className="mb-4 flex h-[min(72vh,560px)] w-[min(calc(100vw-2.5rem),380px)] flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl"
          aria-label="AI assistant chat"
        >
          <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-700 bg-blue-950 text-blue-300">
                <Bot size={18} />
              </div>
              <div>
                <h2 className="m-0 text-sm font-semibold text-white">
                  AI Assistant
                </h2>
                <p className="text-xs text-slate-500">
                  Online
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              aria-label="Close chat"
              title="Close chat"
            >
              <X size={16} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      isUser
                        ? "bg-blue-700 text-white"
                        : message.tone === "error"
                          ? "border border-rose-800 bg-rose-950 text-rose-200"
                          : "border border-slate-800 bg-slate-900 text-slate-200"
                    }`}
                  >
                    <p className="whitespace-pre-line break-words">
                      {message.text}
                    </p>
                  </div>
                </div>
              );
            })}

            {sending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-300">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-800 bg-slate-900 p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question"
                rows={1}
                className="max-h-28 min-h-10 flex-1 resize-none rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!prompt.trim() || sending}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-700 bg-blue-950 text-blue-300 transition-colors hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-900 disabled:text-slate-600"
                aria-label="Send message"
                title="Send message"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-blue-600 bg-blue-700 text-white shadow-xl shadow-blue-950/40 transition-transform hover:scale-105 hover:bg-blue-600"
        aria-label={open ? "Hide AI assistant" : "Open AI assistant"}
        title={open ? "Hide AI assistant" : "Open AI assistant"}
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
