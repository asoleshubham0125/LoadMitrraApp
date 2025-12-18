import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SupplierPanelWrapper from "./PanelWrapper";
import API from "../../api/axios";
import { useSupplierAuth } from "../context/SupplierAuthContext";

export default function SupplierChatPanel() {
  const { loadId, supplierId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const { supplier, token } = useSupplierAuth();

  /* 🔄 AUTO REFRESH */
  useEffect(() => {
    if (!loadId || !supplier) return;

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Polling every 3 seconds
    return () => clearInterval(interval);
  }, [loadId, supplier]);

  /* 🔽 AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/chat/${loadId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load chat", err);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await API.post(
        `/chat/${loadId}`,
        {
          message: text.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
      fetchMessages(); // Refresh immediately after sending
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (!supplier) return null;

  return (
    <SupplierPanelWrapper title="Chat with Driver">
      <div className="d-flex flex-column h-100">
        {/* MESSAGES */}
        <div className="flex-grow-1 p-3 overflow-auto">
          {messages.map((m) => {
            // 1. Get Sender ID from message
            const senderId = String(m.senderId || "");

            // 2. Get Current Logged-in Supplier ID (Handle _id or id)
            const myId = String(
              supplier?._id || supplier?.id || supplierId || ""
            );

            // 3. Determine if the message is from 'Me'
            //    Priority: Check ID match first. Fallback to Role match.
            const isSupplier = myId
              ? senderId === myId
              : m.senderRole === "supplier";

            return (
              <div
                key={m._id}
                className={`mb-2 d-flex ${
                  isSupplier ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div>
                  {/* NAME */}
                  <div className="small text-muted mb-1">
                    {isSupplier ? "You" : "Captain"}
                  </div>

                  {/* MESSAGE BUBBLE */}
                  <div
                    className={`px-3 py-2 rounded ${
                      isSupplier ? "bg-primary text-white" : "bg-light border"
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
    </SupplierPanelWrapper>
  );
}
