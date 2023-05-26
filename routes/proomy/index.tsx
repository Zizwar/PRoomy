import { HandlerContext, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import twas from "twas";
import { getCookies, setCookie } from "$std/http/cookie.ts";
import { databaseLoader } from "@/communication/database.ts";
import { gitHubApi } from "@/communication/github.ts";
import { googleApi } from "@/communication/google.ts";

import type { RoomView } from "@/communication/types.ts";

export async function handler(
  req: Request,
  ctx: HandlerContext
): Promise<Response> {
  // Get cookie from request header and parse it
  const maybeAccessToken = getCookies(req.headers)["roomy_prompt_token"];
  const database = await databaseLoader.getInstance();
  if (maybeAccessToken) {
    const user = await database.getUserByAccessToken(maybeAccessToken);
    if (user) {
      return ctx.render({ rooms: await database.getRooms() });
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
  const provider = url.searchParams.get("scope");
  let accessToken, userData;
  if (provider?.includes("google")) {
    accessToken = await googleApi.getAccessToken(code);
    userData = await googleApi.getUserData(accessToken);
  } else {
    //console.log({provider})
    // Provider is github
    accessToken = await gitHubApi.getAccessToken(code);
    userData = await gitHubApi.getUserData(accessToken);
  }
  const user = await database.getUserByAccessToken(accessToken);
  if (user) {
    return ctx.render({ rooms: await database.getRooms() });
  }
  await database.insertUser({
    userId: userData.userId,
    userName: userData.userName,
    accessToken,
    avatarUrl: userData.avatarUrl,
  });

  const response = await ctx.render({
    rooms: await database.getRooms(),
  });
  setCookie(response.headers, {
    name: "roomy_prompt_token",
    value: accessToken,
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  return response;
}

export default function Proomy({ url, data }: PageProps<{ rooms: RoomView[] }>) {
  return (
    <>
      <Head>
        <title>PRoomy - Roomy Prompt</title>
      </Head>

      <div class="flex justify-center items-center h-screen text-gray-600">
        <div>
          <div class="mb-16 mx-8 text-center">
            <img
              class="h-24 mx-auto mb-6"
              src="/favicon.ico"
              alt="PRoomy Logo"
            />
            <span class="block text-3xl font-bold text-black mb-3">
              Roomy Prompt - ChatGPT Rooms
            </span>
            <span class="block text-lg -mb-1.5"></span>
          </div>
          {data && (
            <ul
              role="list"
              class="max-h-[21.375rem] mx-2 md:mx-0 overflow-y-scroll space-y-4.5"
            >
              {data.rooms.map((room) => {
                return (
                  <li key={room.roomId}>
                    <a
                      href={"/proomy/" + room.roomId}
                      class="grid grid-cols-3 items-center bg-white rounded-full h-18 border-2 border-gray-300 transition-colors hover:(bg-gray-100 border-gray-400) group"
                    >
                      <div
                        class="w-12 h-12 bg-cover rounded-3xl ml-3"
                        style={`background-image: url('/images/logos/jpt%20(${
                          (room.roomId % 36) + 1
                        }).jpg')`}
                      />
                      <p class="text-xl font-bold text-gray-900 justify-self-center group-hover:underline group-focus:underline">
                        {room.name}
                      </p>
                      <p class="font-medium text-gray-400 mr-8 justify-self-end">
                        {room.lastMessageAt
                          ? twas(new Date(room.lastMessageAt).getTime())
                          : "No messages"}
                      </p>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
