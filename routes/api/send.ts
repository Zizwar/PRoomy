import { HandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { emojify } from "emojify";
import { databaseLoader } from "@/communication/database.ts";
import { RoomChannel } from "@/communication/channel.ts";
import { cleanBadWors } from "@/helpers/bad_words.ts";
import { ApiSendMessage } from "@/communication/types.ts";
import Gpt from "@/communication/gpt.ts";

import { OpenAI } from "openai";

export async function handler(
  req: Request,
  _ctx: HandlerContext
): Promise<Response> {
  const accessToken = getCookies(req.headers)["roomy_prompt_token"];
  if (!accessToken) {
    return new Response("Not signed in", { status: 401 });
  }
  const database = await databaseLoader.getInstance();
 
  const user = await database.getUserByAccessTokenOrThrow(accessToken);
  const data = (await req.json()) as ApiSendMessage;
  const channel = new RoomChannel(data.roomId); 
  let {prompt:proomy,status} = await database.getRoom(data.roomId);

////
const from = {
    name: user.userName,
    avatarUrl: user.avatarUrl,
  };

  if (data.kind === "isTyping") {
    // Send `is typing...` indicator.
    channel.sendIsTyping(from);
  }

let message = emojify(cleanBadWors(data.message));

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

////////
if(status==="search"){
const gpt = new Gpt(); 
     const keywords = await gpt.searchVector(message); 
     console.log({ keywords }); 
  
     const database = await databaseLoader.getInstance(); 
     const resault = await database.searchVector(keywords); 
     
proomy+=JSON.stringify(resault);

message+=", اجب بماهوا موجود في نتائج بحث ملف جيزن، ورقم الغرفة و الرد، اسرد جميع الردود ورقمه و رقم الغرفة و نبدة عن النص، لاتذكر ملف الجيزن في ردودك، بل نتائج البحث.،";
console.log("vector",{ proomy });
}

//////
  
  

  
  ///paly ai
  if (!message?.startsWith("@") && proomy) {
    const openAI = new OpenAI(Deno.env.get("KEY_OPEN_AI") ?? "");

    const from = {
      name: "JPT",
      avatarUrl: "https://jpt.ma/favicon.ico",
    };
    channel.sendIsTyping(from);

    const userContent = message.replace("@", "")
    
    const chatCompletion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: proomy },
        { role: "user", content: userContent },
      ],
    });

    const choices = chatCompletion?.choices || [];

    const text = choices[0]?.message?.content || 'error There seems to be an error in your promp. or prompt this room';

    await database.insertMessage({
      text: `${user.userName || ""}: ${text}`,
      roomId: data.roomId,
      userId: 12345666,
      to:user.userId,

    });

    channel.sendText({
      message: `@${user.userName || ""}:\r\n${text}`,
      from,
      createdAt: new Date().toISOString(),
    });
  }
  //// end ai
  channel.close();

  return new Response("OK");
}
