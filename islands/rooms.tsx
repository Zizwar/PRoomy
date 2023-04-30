// deno-lint-ignore-file
// deno-lint-ignore-file no-explicit-any
//import type { RoomView } from "@/communication/types.ts";
// deno-lint-ignore ban-unused-ignore
// deno-lint-ignore no-explicit-any
import { server } from "@/communication/server.ts";
import twas from "twas";
//import AddRoom from "./AddRoom.tsx";
export default function Romms({ url, data }: any) {
  const creatRoms = async () => {
    const nameRoom = prompt("name room");
    const promptRoom = prompt("your prompte for this room") || '';
   if(!nameRoom) return alert("void name room!")
   if(!promptRoom) return alert("void Prompt room!")
    try {
      const create = await server.createRoom({name:nameRoom,prompt:promptRoom});
      //const roomId = await create
      alert("room ID:" + create);
      document.location = create
    } catch (err) {
      alert(`Cannot create room: ${err.message}`);
    }
  };
  return (
    <>
      <div class="conversation-area">
        {data.rooms.map((room: any) => {
          return (
            <>
              <div class="msg online" onClick={()=>{document.location = room.roomId}}>
        
                  <img
                    class="msg-profile"
                    src={"https://deno-avatar.deno.dev/avatar/" + room.roomId}
                    alt=""
                  />
                  <div class="msg-detail">
                    <div class="msg-username"> {room.name}</div>
                    <div class="msg-content">
                      <span class="msg-message"></span>
                      <span class="msg-date">
                        {" "}
                        {room.lastMessageAt
                          ? twas(new Date(room.lastMessageAt).getTime())
                          : "No messages"}
                      </span>
                    </div>
                  </div>
          
              </div>
            </>
          );
        })}

       <button onClick={creatRoms} class="add"></button>
        <div class="overlay"></div>
      </div>
    </>
  );
}
