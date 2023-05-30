import { SitemapContext } from "seo";
import { databaseLoader } from "@/communication/database.ts";
import manifest from "@/fresh.gen.ts";

export const handler = {
  async GET(_request, _context) {
    const database = await databaseLoader.getInstance();
    const rooms = await database.getRooms();

    const sitemap = new SitemapContext("https://jpt.ma", manifest);
    const removeListe = [
      "send",
      "connect",
      "logout",
      "ai",
      "create_room",
      "auth/github",
      "auth/google",
      "test",
    ];
    removeListe.forEach((param) => sitemap.remove("/api/" + param));
    rooms.map((room) => sitemap.add("/proomy/" + room.roomId));

    return sitemap.render();
  },
};
