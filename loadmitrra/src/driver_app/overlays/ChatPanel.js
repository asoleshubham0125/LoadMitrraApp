import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import PanelWrapper from "./PanelWrapper";
import API from "../../api/axios";
import { useDriverAuth } from "../context/DriverAuthContext";

export default function ChatPanel() {
  const { loadId } = useParams();
  const { driver } = useDriverAuth();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  /* 🔄 AUTO REFRESH */
  useEffect(() => {
    if (!loadId) return;

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [loadId]);

  /* 🔽 AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/chat/${loadId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load chat", err);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await API.post(`/chat/${loadId}`, {
        message: text.trim(),
      });

      setText("");
      fetchMessages();
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (!driver) return null;

  return (
    <PanelWrapper title="Chat with Supplier">
      <div className="d-flex flex-column h-100">
        {/* MESSAGES */}
        <div className="flex-grow-1 p-3 overflow-auto">
          {messages.map((m) => {
            const isDriver = m.senderRole === "driver";

            return (
              <div
                key={m._id}
                className={`mb-2 d-flex ${
                  isDriver ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div>
                  {/* NAME */}
                  <div className="small text-muted mb-1">
                    {isDriver ? "Captain" : "Supplier"}
                  </div>

                  {/* MESSAGE BUBBLE */}
                  <div
                    className={`px-3 py-2 rounded ${
                      isDriver ? "bg-primary text-white" : "bg-light border"
                    }`}
                    style={{ maxWidth: "260px" }}
                  >
                    {m.message}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="border-top p-2 d-flex gap-2">
          <input
            className="form-control"
            value={text}
            placeholder="Type message..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </PanelWrapper>
  );
}
