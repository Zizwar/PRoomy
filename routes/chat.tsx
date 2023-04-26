import ChatArea from "@/islands/chat-aria.tsx";
import Rooms from "@/islands/rooms.tsx";
import Detail from "@/islands/detail.tsx";
import Header from "@/islands/header.tsx";
//
import { Handler, HandlerContext, PageProps, RouteConfig } from "$fresh/server.ts";

import { getCookies, setCookie } from "$std/http/cookie.ts";
import { databaseLoader } from "@/communication/database.ts";
import { gitHubApi } from "@/communication/github.ts";
import { googleApi } from "@/communication/google.ts";

import type { RoomView } from "@/communication/types.ts";
import type { MessageView, UserView } from "@/communication/types.ts";
//

//
interface Data {
  messages: MessageView[];
  roomName: string;
  user: UserView;
  rooms: RoomView[];
}

export default function Home({ url, data, params }: PageProps<Data>) {
  return (
    <>
      <div class="app">
        <Header />
        {data && (
          <div class="wrapper">
            <Rooms url={url} data={data} />

            <ChatArea
              roomId={+params.room || 1}
              initialMessages={data.messages}
              roomName={data.roomName}
              user={data.user}
            />

            <Detail />
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
  const maybeAccessToken = getCookies(req.headers)["deploy_chat_token"];
  const database = await databaseLoader.getInstance();
  if (maybeAccessToken) {
    const user = await database.getUserByAccessToken(maybeAccessToken);
    if (user) {
      const [rooms, messages, roomName] = await Promise.all([
        database.getRooms(),
        database.getRoomMessages(+ctx.params.room || 2),
        database.getRoomName(+ctx.params.room || 2) ,
      ]);
      const response = await ctx.render({
        user,
        rooms,
        messages,
        roomName,
      });
      return response;
    }
  }

  // This is an oauth callback request.
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return ctx.render(false);
  }

  //  const accessToken = await gitHubApi.getAccessToken(code);
  //const userData = await gitHubApi.getUserData(accessToken);
  // Check the provider value from the query string
  const provider = "google"; //url.searchParams.get("provider");
  let accessToken, userData;
  if (provider === "google") {
    accessToken = await googleApi.getAccessToken(code);
    userData = await googleApi.getUserData(accessToken);
  } else {
    console.log({ provider });
    // Provider is github
    accessToken = await gitHubApi.getAccessToken(code);
    userData = await gitHubApi.getUserData(accessToken);
  }
  await database.insertUser({
    userId: userData.userId,
    userName: userData.userName,
    accessToken,
    avatarUrl: userData.avatarUrl,
  });

  const [rooms, messages, roomName] = await Promise.all([
    database.getRooms(),
    database.getRoomMessages(+ctx.params.room),
    database.getRoomName(+ctx.params.room),
  ]);
  const response = await ctx.render({
    user: userData,
    rooms,
    messages,
    roomName,
  });
  setCookie(response.headers, {
    name: "deploy_chat_token",
    value: accessToken,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  return response;
}
export const config: RouteConfig = {
  routeOverride: "/chat/:room",
};