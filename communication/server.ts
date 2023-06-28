import type {
  ApiIsTypingMessage,
  ApiTextMessage,
  ChannelMessage,
} from "./types.ts";

export class Server {
  subscribeMessages(
    roomId: number,
    onMessage: (message: ChannelMessage) => void
  ) {
    const events = new EventSource(`/api/connect/${roomId}`);
    const listener = (e: MessageEvent) => {
      const msg = JSON.parse(e.data) as ChannelMessage;
      onMessage(msg);
    };
    events.addEventListener("message", listener);
    return {
      unsubscribe() {
        events.removeEventListener("message", listener);
      },
    };
  }

  sendMessage(roomId: number, message: string) {
    const data: ApiTextMessage = {
      kind: "text",
      message,
      roomId,
    };
    fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  sendIsTyping(roomId: number) {
    const data: ApiIsTypingMessage = {
      kind: "isTyping",
      roomId,
    };
    fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async createRoom({ name, prompt }: { name: string; prompt: string }) {
    const res = await fetch("/api/create_room", {
      method: "POST",
      body: JSON.stringify({ name, prompt }),
    });
    const text = await res.text();
    if (!res.ok) {
      // alert(text); // Nothing fancy
      throw new Error(text);
    }
    return text;
  }
  async updateRoom({
    name,
    prompt,
    roomId,
  }: {
    name?: string | undefined;
    prompt?: string | undefined;
    roomId: string;
  }) {
    const res = await fetch("/api/update_room", {
      method: "POST",
      body: JSON.stringify({ name, prompt, roomId }),
    });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(text);
    }
    return text;
  }

  async searchVector({query }: { query: string;  }) { 
     const res = await fetch("/api/search", { 
       method: "POST", 
       body: JSON.stringify({ query}), 
     }); 
     const text = await res.text(); 
     if (!res.ok) { 
       // alert(text); // Nothing fancy 
       throw new Error(text); 
     } 
     return text; 
   }
}
export const server = new Server();
