import { HandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { emojify } from "emojify";
import { databaseLoader } from "@/communication/database.ts";
import { RoomChannel } from "@/communication/channel.ts";
import { badWordsCleanerLoader } from "@/helpers/bad_words.ts";
import { ApiSendMessage } from "@/communication/types.ts";

import {OpenAI} from "openai";

const openAI = new OpenAI(Deno.env.get("KEY_OPEN_AI") ?? "");

async function streamResults(openAI, query) {
  const results = [];
  while (true) {
    const response = await openAI.createCompletion(query);
    if (!response.choices) {
      break;
    }
    results.push(response.choices[0].message.content);
    query = results[results.length - 1];
  }
  return results;
}

async function handler(req, ctx) {
  const accessToken = getCookies(req.headers)["deploy_chat_token"];
  if (!accessToken) {
    return new Response("Not signed in", { status: 401 });
  }

  const database = await databaseLoader.getInstance();

  const user = await database.getUserByAccessTokenOrThrow(accessToken);
  const data = (await req.json()) as ApiSendMessage;
  const channel = new RoomChannel(data.roomId);
  const prooms = await database.getRoomPrompt(data.roomId);

  const from = {
    name: user.userName,
    avatarUrl: user.avatarUrl,
  };

  if (data.kind === "isTyping") {
    // Send `is typing...` indicator.
    channel.sendIsTyping(from);
  }

  const badWordsCleaner = await badWordsCleanerLoader.getInstance();
  const message = emojify(badWordsCleaner.clean(data.message));

  channel.sendText({
    message: message,
    from,
    createdAt: new Date().toISOString(),
  });

  await database.insertMessage({
    text: message,
    roomId: data.roomId,
    userId: user.userId,
  });

  ///paly ai
  if (message?.includes("@jpt")) {
    const results = await streamResults(openAI, message.replace("@jpt", ""));

    // send the results to the channel
    for (const result of results) {
      channel.sendText({
        message: result,
        from,
        createdAt: new Date().toISOString(),
      });
    }

    // store the results
    let text = "";
    for (const result of results) {
      text += result + " ";
    }
    await database.insertMessage({
      text,
      roomId: data.roomId,
      userId: 12345666,
    });
  }

  //// end ai
  channel.close();

  return new Response("OK");
}


