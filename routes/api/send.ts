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
  if (message.includes("@jpt")) {
    const from = {
      name: "@JPT",
      avatarUrl: "https://jpt.ma/favicon.ico",
    };
    channel.sendIsTyping(from);
    const text = message.replace(
      "@jpt",
      `Hi @${user.userName} your MrPrompte JPT incoming ....`
    );

    await database.insertMessage({
      text,
      roomId: data.roomId,
      userId: 12345666,
    });
    channel.sendText({
      message: text,
      from,
      createdAt: new Date().toISOString(),
    });
  }

  channel.close();

  return new Response("OK");
}
