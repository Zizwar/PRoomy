// deno-lint-ignore-file
// deno-lint-ignore-file no-explicit-any
//import type { RoomView } from "@/communication/types.ts";
// deno-lint-ignore ban-unused-ignore
// deno-lint-ignore no-explicit-any
import { server } from "@/communication/server.ts";
import twas from "twas";
import AddRoom from "./AddRoom.tsx";
export default function Conversation({ url, data }: any) {
  const creatRoms =async ()=>{
    const promptRoom = prompt('name room')
    const create = server.createRoom(promptRoom || '');
    try {
      const roomId = await create;
      alert("room ID:"+roomId) ;
    } catch (err) {
      alert(`Cannot create room: ${err.message}`);
    }
  }
  return (
    <>
      <div class="conversation-area">
        {data.rooms.map((room: any) => {
          return (
            <>
              <div class="msg online">
                <img
                  class="msg-profile"
                  src= {"https://deno-avatar.deno.dev/avatar/" + room.roomId}
                  alt=""
                />
                <div class="msg-detail">
                  <div class="msg-username"> {room.name}</div>
                  <div class="msg-content">
                    <span class="msg-message"></span>
                    <span class="msg-date">  {room.lastMessageAt
                          ? twas(new Date(room.lastMessageAt).getTime())
                          : "No messages"}</span>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        <div class="msg online">
          <img
            class="msg-profile"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png"
            alt=""
          />
          <div class="msg-detail">
            <div class="msg-username">Madison Jones</div>
            <div class="msg-content">
              <span class="msg-message">What time was our meet</span>
              <span class="msg-date">20m</span>
            </div>
          </div>
        </div>

        <div class="msg">
          <img
            class="msg-profile"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%2812%29.png"
            alt=""
          />
          <div class="msg-detail">
            <div class="msg-username">Miguel Cohen</div>
            <div class="msg-content">
              <span class="msg-message">
                Adaptogen taiyaki austin jean shorts brunch
              </span>
              <span class="msg-date">20m</span>
            </div>
          </div>
        </div>

        <div class="msg active">
          <div class="msg-profile group">
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-i6dzq1"
            >
              <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
              <path d="M22 8.5l-10 7-10-7" />
              <path d="M2 15.5l10-7 10 7M12 2v6.5" />
            </svg>
          </div>
          <div class="msg-detail">
            <div class="msg-username">CodePen Group</div>
            <div class="msg-content">
              <span class="msg-message">Aysenur: I love CSS</span>
              <span class="msg-date">28m</span>
            </div>
          </div>
        </div>

        <button onClick={creatRoms} class="add"></button>
        <div class="overlay"></div>
      </div>
    </>
  );
}
