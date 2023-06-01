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
    user.userName === "demo" &&
      confirm("need login :)") &&
      (document.location = "/login");

    if (input === "") {
      return;
    }
    server.sendMessage(roomId, input);
    setInput("");
  };
  const GroupAreaAvatar = () => {
    const uniqueAvatars = new Set();
    let num = 0;
    const avatarElements = messages.map((message, index) => {
      const avatarUrl = message.from.avatarUrl;
      if (uniqueAvatars.has(avatarUrl)) {
        return null;
      } else {
        if (num > 7) return null;
        uniqueAvatars.add(avatarUrl);
        num++;
        return <img class="chat-area-profile" src={avatarUrl} />;
      }
    });
    return <>{avatarElements}</>;
  };

  return (
    <div class="chat-area" ref={messagesContainer}>
      <div class="chat-area-header">
        <div class="chat-area-title">{roomName}</div>

        <div class="chat-area-group">
          <GroupAreaAvatar />

          <span>+</span>
        </div>
      </div>
      <div class="chat-area-main">
        {messages.map((message) => (
          <div
            class={`chat-msg ${
              message.from.name === user?.userName ? "owner" : ""
            }`}
          >
            <div class="chat-msg-profile">
              <img
                class="chat-msg-img"
                src={message.from.avatarUrl}
                alt={`${message.from.name}'s avatar`}
              />
              <p class="detail-subtitle" style="color:var(--theme-color)">
                @{message.from.name}
              </p>
              <div class="chat-msg-date">
                {" "}
                {twas(new Date(message.createdAt).getTime())}
              </div>
            </div>
            <div class="chat-msg-content">
              <div
                class={`chat-msg-text ${
                  /[\u0600-\u06FF]/.test(message.message) ? "rtl" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: message.message.replace(
                    /```(.*?)```/gs,
                    (_match, group) => {
                      return `<pre class="pre-code"><code>${group
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")}</code></pre>`;
                    }
                  ),
                }}
              >
                {}
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
        <textarea
          type="text"
          value={input}
          onInput={(e) => {
            setInput(e.currentTarget.value);
            server.sendIsTyping(roomId);
          }}
          class="text-area-input"
          placeholder="Type something here..."
        />
        <svg
          onClick={(e) => send()}
          viewBox="0 0 513 513"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M256.025.05C117.67-2.678 3.184 107.038.025 245.383a240.703 240.703 0 0085.333 182.613v73.387c0 5.891 4.776 10.667 10.667 10.667a10.67 10.67 0 005.653-1.621l59.456-37.141a264.142 264.142 0 0094.891 17.429c138.355 2.728 252.841-106.988 256-245.333C508.866 107.038 394.38-2.678 256.025.05z"
            class="feather feather-plus-circle"
            fill="#0086ff"
          ></path>
          <path
            d="M330.518 131.099l-213.825 130.08c-7.387 4.494-5.74 15.711 2.656 17.97l72.009 19.374a9.88 9.88 0 007.703-1.094l32.882-20.003-10.113 37.136a9.88 9.88 0 001.083 7.704l38.561 63.826c4.488 7.427 15.726 5.936 18.003-2.425l65.764-241.49c2.337-8.582-7.092-15.72-14.723-11.078zM266.44 356.177l-24.415-40.411 15.544-57.074c2.336-8.581-7.093-15.719-14.723-11.078l-50.536 30.744-45.592-12.266L319.616 160.91 266.44 356.177z"
            fill="#fff"
          ></path>
        </svg>
      </div>
    </div>
  );
}
