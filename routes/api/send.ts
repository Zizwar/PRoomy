import { HandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { emojify } from "emojify";
import { databaseLoader } from "@/communication/database.ts";
import { RoomChannel } from "@/communication/channel.ts";
import { badWordsCleanerLoader } from "@/helpers/bad_words.ts";
import { ApiSendMessage } from "@/communication/types.ts";

import { OpenAI } from "openai";

export async function handler(
  req: Request,
  _ctx: HandlerContext
): Promise<Response> {
  const accessToken = getCookies(req.headers)["deploy_chat_token"];
  if (!accessToken) {
    return new Response("Not signed in", { status: 401 });
  }
  const database = await databaseLoader.getInstance();
  const user = await database.getUserByAccessTokenOrThrow(accessToken);
  const data = (await req.json()) as ApiSendMessage;
  const channel = new RoomChannel(data.roomId);
  const from = {
    name: user.userName,
    avatarUrl: user.avatarUrl,
  };

  if (data.kind === "isTyping") {
    // Send `is typing...` indicator.
    channel.sendIsTyping(from);
  }

  const badWordsCleaner = await badWordsCleanerLoader.getInstance();
  //const message = emojify(badWordsCleaner.clean(data.message));
  const message = emojify(data.message);

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
  if (message.includes("@jpt")) {
    const openAI = new OpenAI(Deno.env.get("KEY_OPEN_AI") ?? "");

    const from = {
      name: "@JPT",
      avatarUrl: "https://jpt.ma/favicon.ico",
    };
    channel.sendIsTyping(from);

    const userContent = message.replace("@jpt", `chatgpt`);
    const SystemRoleContenet =
      "شات جي بي تي  انت تفهم جميع اللغاتوفي جميع المجالاتاي نص اعطيته لك افهمه وعالجه وورد على اي إستفسار لك رد باللهجة المغربية يمكنك كتابة كلمات تقنية لكن اكتبها بالدارجة المغربية، ركز الرد بالدارجة المغربية";

    const chatCompletion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SystemRoleContenet },
        { role: "user", content: userContent },
      ],
    });

    const choices = chatCompletion?.choices;

    const text = choices[0]?.message.content;

    await database.insertMessage({
      text: `${user.userId ?? ""}:${text}`,
      roomId: data.roomId,
      userId: 12345666,
    });
    channel.sendText({
      message: `${user.userId ?? ""}:${text}`,
      from,
      createdAt: new Date().toISOString(),
    });
  }
  //// end ai
  channel.close();

  return new Response("OK");
}
