import { useEffect, useReducer, useRef, useState } from "preact/hooks";
import twas from "twas";
import type { MessageView, UserView } from "../communication/types.ts";
import { server } from "@/communication/server.ts";

export default function Chat({
  roomId,
  roomName,
  initialMessages,
  user,
}: {
  roomId: number;
  roomName: string;
  initialMessages: MessageView[];
  user: UserView;
}) {
  const messagesContainer = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [messages, addMessage] = useReducer<MessageView[], MessageView>(
    (msgs, msg) => [...msgs, msg],
    initialMessages
  );
  const [typing, setTyping] = useState<{
    user: UserView;
    interval: number;
  } | null>(null);

  useEffect(() => {
    Notification.requestPermission();

    const subscription = server.subscribeMessages(roomId, (msg) => {
      switch (msg.kind) {
        case "isTyping": {
          if (typing) {
            clearInterval(typing.interval);
          }
          const interval = setTimeout(() => {
            setTyping(null);
          }, 5000);
          setTyping({
            user: msg.from,
            interval,
          });
          break;
        }
        case "text":
          addMessage(msg);
          new Notification(`New message from ${msg.from.name}`, {
            body: msg.message,
            icon: msg.from.avatarUrl,
          });
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const container = messagesContainer.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages?.length]);

  const send = () => {
    if (input === "") {
      return;
    }
    server.sendMessage(roomId, input);
    setInput("");
  };
  return (

      <div class="chat-area" ref={messagesContainer}>
        <div class="chat-area-header">
          
          <div class="chat-area-title">{roomName}</div>
        
          <div class="chat-area-group">
            <img
              class="chat-area-profile"
              src="https://jpt.ma/favicon.ico"
              alt=""
            />
            <img
              class="chat-area-profile"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%282%29.png"
              alt=""
            />
          
            <span>+2</span>
          </div>
        </div>
        <div class="chat-area-main" >
          {messages.map((message) => (
             <div class={`chat-msg ${message.from.name !== user.name && "owner"}`}>
              <div class="chat-msg-profile">
                <img
                  class="chat-msg-img"
                  src={message.from.avatarUrl}
                  alt={`${message.from.name}'s avatar`}
                /><p class="detail-subtitle" style="color:var(--theme-color)">@{message.from.name}</p>
                <div class="chat-msg-date">  {twas(new Date(message.createdAt).getTime())}</div>
              </div>
              <div class="chat-msg-content">
                <div class="chat-msg-text">
                {message.message}
                </div>
              </div>
            </div>
          ))}
         {typing && (
            <div class="detail-change">{typing?.user?.name} is typing...</div>
          )}
        </div>

        <div class="chat-area-footer"> 
      
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-video"
          >
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-image"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-paperclip"
          >
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
          <input type="text"   value={input}
        onInput={(e) => {
          setInput(e.currentTarget.value);
          server.sendIsTyping(roomId);
        }}
        onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type something here..." />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-smile"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-thumbs-up"
          >
            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
          </svg>
        </div>
      </div>
  
  );
}
