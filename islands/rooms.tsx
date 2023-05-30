
import { server } from "@/communication/server.ts";
import twas from "twas";

export default function Romms({ data,user }: any) {
  const creatRoms = async () => {
    
    if(user.userName === "demo") {
    confirm("need login :)") &&
    (document.location = "/login");
  return;
  }
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
      alert(`Cannot create room`);
      location.reload()
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
                    src={`/images/logos/jpt%20(${room.roomId % 36 + 1}).jpg`}
                    alt=""
                  />
                  <div class="msg-detail">
                    <a href={room.roomId} class="msg-username"> {room.name}</a>
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
      </div>
    </>
  );
}
