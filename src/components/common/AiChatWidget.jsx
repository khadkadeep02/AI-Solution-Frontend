import { useEffect, useRef, useState, useCallback, Fragment } from "react";
import axios from "axios";
import { Bot, Send, X, MessageCircle, Sparkles } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;
const MAX_WORDS = 120;

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    text: "Hi! I'm here to help. Ask me anything.",
    time: formatTime(),
  },
];

function getErrorMessage(error) {
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  return "Unable to reach the assistant right now.";
}

/* ---------- Lightweight markdown renderer ----------
 * Handles the subset of markdown LLM responses typically use:
 * **bold**, "* " / "- " bullet lists, and paragraph breaks.
 * This avoids showing raw "**" / "*" characters and avoids the
 * ugly, uneven line-wrapping that comes from rendering markdown
 * as plain pre-formatted text.
 */
function renderInline(text, keyPrefix) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-t-${i}`}>{part}</Fragment>;
  });
}

function MessageContent({ text }) {
  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  const blocks = [];
  let currentList = null;

  lines.forEach((line, idx) => {
    const isBullet = /^[*-]\s+/.test(line);
    if (isBullet) {
      const content = line.replace(/^[*-]\s+/, "");
      if (!currentList) {
        currentList = { type: "list", items: [] };
        blocks.push(currentList);
      }
      currentList.items.push(content);
    } else {
      currentList = null;
      blocks.push({ type: "p", content: line, key: idx });
    }
  });

  return (
    <div className="flex flex-col gap-1.5">
      {blocks.map((block, i) =>
        block.type === "list" ? (
          <ul key={`list-${i}`} className="ml-4 list-disc space-y-0.5">
            {block.items.map((item, j) => (
              <li key={`item-${i}-${j}`} className="break-words">
                {renderInline(item, `li-${i}-${j}`)}
              </li>
            ))}
          </ul>
        ) : (
          <p key={`p-${i}`} className="break-words">
            {renderInline(block.content, `p-${i}`)}
          </p>
        )
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
        <Sparkles size={13} className="text-blue-500" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-slate-100 px-3 py-3 dark:border-slate-700 dark:bg-slate-800">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
          />
        ))}
      </div>
    </div>
  );
}

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
      <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
        {!isUser && (
          <div className="flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
            <Sparkles size={13} className="text-blue-500" />
          </div>
        )}
        <div
          className={`max-w-full min-w-0 rounded-2xl px-3 py-2 text-[13.5px] leading-relaxed [overflow-wrap:break-word] [word-break:normal] [hyphens:auto] ${
            isUser
              ? "rounded-br-sm bg-blue-500 text-white"
              : message.tone === "error"
                ? "rounded-bl-sm border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
                : "rounded-bl-sm border border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          }`}
        >
          {isUser ? (
            <p className="break-words">{message.text}</p>
          ) : (
            <MessageContent text={message.text} />
          )}
        </div>
      </div>
      {message.time && (
        <p className={`px-1 text-[10px] text-slate-400 dark:text-slate-500 ${isUser ? "pr-2" : "pl-9"}`}>
          {message.time}
        </p>
      )}
    </div>
  );
}

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [prompt, setPrompt] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [open]);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }, []);

  const handleSubmit = async (event) => {
    event?.preventDefault();

    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || sending) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedPrompt,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setSending(true);

    try {
      const response = await axios.post(`${API_BASE}/ai/ask/`, {
        prompt: trimmedPrompt,
        max_words: MAX_WORDS,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: response.data?.response || "I could not generate a response.",
          time: formatTime(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          text: getErrorMessage(error),
          tone: "error",
          time: formatTime(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section
          className="flex h-[min(72vh,560px)] w-[min(calc(100vw-2.5rem),380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950"
          aria-label="AI assistant chat"
        >
          {/* Header */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
                <Sparkles size={17} className="text-blue-500" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-50 bg-emerald-400 dark:border-slate-900" />
              </div>
              <div>
                <h2 className="m-0 text-sm font-semibold text-slate-900 dark:text-white">
                  AI Assistant
                </h2>
                <p className="text-[11px] text-emerald-500">
                  Online · replies instantly
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-transparent text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-700 dark:border-slate-700 dark:text-slate-500 dark:hover:border-slate-600 dark:hover:text-slate-300"
              aria-label="Close chat"
            >
              <X size={15} />
            </button>
          </header>

          {/* Messages */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            <p className="text-center text-[11px] text-slate-400 dark:text-slate-600">Today</p>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {sending && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  autoResize();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question…"
                rows={1}
                className="max-h-24 min-h-[38px] flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13.5px] text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-blue-600"
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!prompt.trim() || sending}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-105 hover:bg-blue-600"
        aria-label={open ? "Close chat" : "Open chat"}
        style={{ width: 52, height: 52 }}
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}