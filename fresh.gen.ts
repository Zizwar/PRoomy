// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_500.tsx";
import * as $2 from "./routes/_app.tsx";
import * as $3 from "./routes/_middleware.ts";
import * as $4 from "./routes/api/auth/github.ts";
import * as $5 from "./routes/api/auth/google.ts";
import * as $6 from "./routes/api/connect.ts";
import * as $7 from "./routes/api/create_room.ts";
import * as $8 from "./routes/api/logout.ts";
import * as $9 from "./routes/api/search.ts";
import * as $10 from "./routes/api/send.ts";
import * as $11 from "./routes/api/update_room.ts";
import * as $12 from "./routes/index.tsx";
import * as $13 from "./routes/login.tsx";
import * as $14 from "./routes/proomy/[room].tsx";
import * as $15 from "./routes/proomy/index.tsx";
import * as $16 from "./routes/sitemap.xml.ts";
import * as $17 from "./routes/test.tsx";
import * as $$0 from "./islands/chat.tsx";
import * as $$1 from "./islands/detail.tsx";
import * as $$2 from "./islands/header.tsx";
import * as $$3 from "./islands/rooms.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_500.tsx": $1,
    "./routes/_app.tsx": $2,
    "./routes/_middleware.ts": $3,
    "./routes/api/auth/github.ts": $4,
    "./routes/api/auth/google.ts": $5,
    "./routes/api/connect.ts": $6,
    "./routes/api/create_room.ts": $7,
    "./routes/api/logout.ts": $8,
    "./routes/api/search.ts": $9,
    "./routes/api/send.ts": $10,
    "./routes/api/update_room.ts": $11,
    "./routes/index.tsx": $12,
    "./routes/login.tsx": $13,
    "./routes/proomy/[room].tsx": $14,
    "./routes/proomy/index.tsx": $15,
    "./routes/sitemap.xml.ts": $16,
    "./routes/test.tsx": $17,
  },
  islands: {
    "./islands/chat.tsx": $$0,
    "./islands/detail.tsx": $$1,
    "./islands/header.tsx": $$2,
    "./islands/rooms.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
