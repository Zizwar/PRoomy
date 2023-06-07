import { Head } from "$fresh/runtime.ts";
import { HandlerContext, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
//
import ChatArea from "@/islands/chat.tsx";
import Rooms from "@/islands/rooms.tsx";
import Detail from "@/islands/detail.tsx";
import Header from "@/islands/header.tsx";
//
import { databaseLoader } from "@/communication/database.ts";
import type { RoomView } from "@/communication/types.ts";
import type { MessageView, UserView } from "@/communication/types.ts";
//

//
interface Data {
  messages: MessageView[];
  roomName: string;
  prompt: string;
  user: UserView;
  rooms: RoomView[];
  roomBy:string;
  createAt:string;
}

export default function Room({ url, data, params }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>{data.roomName} - Roomy Prompt</title>
      </Head>

      <div class="app">
        <Header user={data.user}               userName={data.user?.userName} />
        {data && (
          <div class="wrapper">
            <Rooms user={data.user} url={url} data={data} />

            <ChatArea
              roomId={+params.room || 1}
              initialMessages={data.messages}
              roomName={data.roomName}
              user={data.user}
            />

            <Detail
            roomBy={data.roomBy}
            createAt={data.createAt}
              userName={data.user?.userName}
              roomId={+params.room || 1}
              name={data.roomName}
              prompt={data.prompt}
            />
          </div>
        )}
      </div>
    </>
  );
}
export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  // Get cookie from request header and parse it
  const maybeAccessToken = getCookies(req.headers)["roomy_prompt_token"];
  const database = await databaseLoader.getInstance();

  const userDemo = {
    name: "demo",
    avatarUrl: "/images/logos/jpt%20(11).jpg",
    userName: "demo",
  };

let _user;
if(maybeAccessToken)
   _user = await database.getUserByAccessToken(maybeAccessToken);
const user = _user || userDemo;

console.info({user})
  const [rooms, messages, room] = await Promise.all([
    database.getRooms(),
    database.getRoomMessages(+ctx.params.room ?? 2),
    database.getRoom(+ctx.params.room ?? 2),
  ]);

  const { name: roomName, prompt,by:roomBy,created_at:createAt } = room;

  const response = await ctx.render({
    user,
    roomBy,
    rooms,
    room,
    messages,
    roomName,
    prompt,
    createAt
  });
  return response;
}
