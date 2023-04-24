import type {
  ChannelMessage,
  RoomIsTypingChannelMessage,
  RoomTextChannelMessage,
  UserView,
} from "./types.ts";

export class RoomChannel {
  #channel: BroadcastChannel | undefined; // Declare #channel as possibly undefined

  constructor(roomId: number) {
    if (typeof BroadcastChannel !== "undefined") { // Check if BroadcastChannel is defined
      this.#channel = new BroadcastChannel(roomId.toString()); // Assign #channel if BroadcastChannel is defined
    }
  }

  onMessage(handler: (message: ChannelMessage) => void) {
    if (!this.#channel) { // Check if #channel is defined
      return { unsubscribe: () => {} }; // Return an empty object if #channel is undefined
    }

    const listener = (e: MessageEvent) => { // Define the listener function
      handler(e.data); // Call the handler function with the message data
    };
    this.#channel.addEventListener("message", listener); // Add the listener to the #channel
    return {
      unsubscribe: () => {
        this.#channel?.removeEventListener("message", listener); // Remove the listener from the #channel
      },
    };
  }

  close() {
    this.#channel?.close(); // Close the #channel if it exists
  }

  sendText(message: Omit<RoomTextChannelMessage, "kind">) {
    if (this.#channel) { // Check if #channel is defined
      this.#channel.postMessage({
        kind: "text",
        ...message,
      });
    }
  }

  sendIsTyping(user: UserView) {
    if (this.#channel) { // Check if #channel is defined
      const message: RoomIsTypingChannelMessage = {
        kind: "isTyping",
        from: user,
      };
      this.#channel.postMessage(message);
    }
  }
}
