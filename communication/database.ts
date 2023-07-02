import { ResourceLoader } from "../helpers/loader.ts";
import postgres from "$postgres";
import * as supabase from "supabase";
import type { MessageView } from "./types.ts";

export interface DatabaseUser {
  userId: number;
  userName: string;
  avatarUrl: string;
}

export class Database {
  #client: supabase.SupabaseClient;

  constructor(client?: supabase.SupabaseClient) {
    this.#client =
      client ??
      supabase.createClient(
        Deno.env.get("SUPABASE_API_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!
      );
  }

  //

  async __insertUser(user: DatabaseUser & { accessToken: string }) {
    const { error } = await this.#client.from("users").upsert(
      [
        {
          //   id: user.userId,
          avatar_url: user.avatarUrl,
          access_token: user.accessToken,
        },
      ],
      {
        returning: "minimal",
        where: { username: user.userName },
      }
    );
    if (error) {
      throw new Error(error.message);
    }
  }
  //

  async getUserByAccessTokenOrThrow(
    accessToken: string
  ): Promise<DatabaseUser> {
    const user = await this.getUserByAccessToken(accessToken);
    if (user == null) {
      throw new Error("Could not find user with access token.");
    }
    return user;
  }

  async getUserByAccessToken(
    accessToken: string
  ): Promise<DatabaseUser | undefined> {
    const { data, error } = await this.#client
      .from("users")
      .select("id,username,avatar_url")
      .eq("access_token", accessToken);
    if (error) {
      throw new Error(error.message);
    }
    if (data.length === 0) {
      return undefined;
    }
    return {
      userId: data[0].id,
      userName: data[0].username,
      avatarUrl: data[0].avatar_url,
    };
  }
  async getUserByUsername(user: string): Promise<any> {
    const { data, error } = await this.#client
      .from("rooms")
      .select("*")
      .eq("username", user)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data ?? [];
  }
  async getRooms() {
    const { data, error } = await this.#client
      .from("rooms_activity")
      .select("id,name,last_message_at")
      .is("status", null);
    if (error) {
      throw new Error(error.message);
    }
    return data.map((d) => ({
      roomId: d.id,
      name: d.name,
      lastMessageAt: d.last_message_at,
    }));
  }

  async getRoomName(roomId: number): Promise<string> {
    const { data, error } = await this.#client
      .from("rooms")
      .select("name")
      .eq("id", roomId);
    if (error) {
      throw new Error(error.message);
    }
    return data[0].name;
  }

  async searchVector(searchTerm: string): Promise<any> {
    const { data, error } = await this.#client
      .from("messages")
      .select("id, message,room").limit(13)
      .textSearch("message", searchTerm, {
        config: "english",
      //  type: "phrase",
        desc: true,
        ts_rank: true,
      });
    /*raw(`
  SELECT *
  FROM messages
  WHERE to_tsvector('english', message) @@ to_tsquery('english', $1)
  ORDER BY ts_rank(to_tsvector('english', message), to_tsquery('english', $1)) DESC;
`, [searchTerm]);
*/

    if (error) {
      console.error(error);

      throw new Error(error.message);
    } else {
      console.log("resault vector:", data);
      return data;
    }
  }

  async getRoom(roomId: number) {
    const { data = [], error } = await this.#client
      .from("rooms")
      .select("name,prompt,by(username),created_at,status")
      .eq("id", roomId)
      .single();
    if (error) {
      throw new Error(error.message);
    }

    const { name, prompt, by = [], created_at,status }: any = data;

    return { name, prompt, by: by?.username, created_at, status };
  }
  async getRoomPrompt(roomId: number): Promise<string> {
    const { data, error } = await this.#client
      .from("rooms")
      .select("prompt")
      .eq("id", roomId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data?.prompt;
  }
  //
  async updateRoom({
    roomId,
    prompt,
    userId,
    name,
  }: {
    roomId: number;
    prompt?: string;
    userId: number;
    name?: string;
  }) {
    const { error: updateError } = await this.#client
      .from("rooms")
      .update({ prompt, name })
      .eq("id", roomId)
      .eq("by", userId);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }

  async updateRoomName({
    roomId,
    name,
    userId,
  }: {
    roomId: number;
    name: string;
    userId: number;
  }) {
    const { error: updateError } = await this.#client
      .from("rooms")
      .update({
        name,
      })
      .eq("id", roomId)
      .eq("by", userId);

    if (updateError) {
      throw new Error(updateError.message);
    }
  }

  //
  async ensureRoom({
    name,
    prompt,
    userId,
  }: {
    name: string;
    prompt: string;
    userId: number;
  }) {
    const insert = await this.#client
      .from("rooms")
      .insert([{ name, prompt, by: userId }], {
        upsert: false,
        returning: "representation",
      });

    if (insert.error) {
      if (insert.error.code !== "23505") {
        throw new Error(insert.error.message);
      }
    }
    const get = await this.#client.from("rooms").select("id").eq("name", name);
    if (get.error) {
      throw new Error(get.error.message);
    }
    if (get.data && get.data[0]) {
      return get.data[0].id;
    }
    // return insert.data![0].id;
  }
  async insertMessage({
    text,
    roomId,
    userId,
    to,
  }: {
    text: string;
    roomId: number;
    userId: number;
    to?: number;
  }) {
    await this.#client.from("messages").insert(
      [
        {
          message: text,
          room: roomId,
          from: userId,
          to,
        },
      ],
      { returning: "minimal" }
    );
  }

  async getRoomMessages(roomId: number): Promise<MessageView[]> {
    const { data, error } = await this.#client
      .from("messages")
      .select("message,from(username,avatar_url),created_at")
      .eq("room", roomId)
      .order("created_at", { ascending: true });
    if (error) {
      throw new Error(error.message);
    }
    return data.map((m) => ({
      message: m.message,
      from: {
        name: m.from.username,
        avatarUrl: m.from.avatar_url,
      },
      createdAt: m.created_at,
    }));
  }

  async insertUser(user: DatabaseUser & { accessToken: string }) {
    const { data, error } = await this.#client
      .from("users")
      .select("*")
      .eq("username", user.userName);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length > 0) {
      // Username already exists, update the existing record
      const { error: updateError } = await this.#client
        .from("users")
        .update({
          avatar_url: user.avatarUrl,
          access_token: user.accessToken,
        })
        .eq("username", user.userName);

      if (updateError) {
        throw new Error(updateError.message);
      }
    } else {
      // Username does not exist, insert a new record
      const { error: insertError } = await this.#client.from("users").upsert(
        [
          {
            username: user.userName,
            avatar_url: user.avatarUrl,
            access_token: user.accessToken,
          },
        ],
        { returning: "minimal" }
      );

      if (insertError) {
        throw new Error(insertError.message);
      }
    }
  }
}

export const databaseLoader = new ResourceLoader<Database>({
  async load() {
    // Automatically create the database schema on startup.
    /*  const caCert = getEnvOrThrow("SUPABASE_CA_CERTIFICATE").replace(
      /\s+(?!CERTIFICATE--)/g,
      "\n",
    );
    */
    const sql = postgres(getEnvOrThrow("SUPABASE_POSTGRES_URI"), {
      keep_alive: null, // Otherwise required '--unstable' flag.
      //  ssl: { caCerts: [caCert] },
    });
    await sql`
      create table if not exists users (
        id integer generated by default as identity primary key,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        username text unique,
        avatar_url text,
        access_token text
      )`;
    await sql`
      create table if not exists rooms (
        id integer generated by default as identity primary key,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        name text unique not null,
        prompt text
      )`;
    await sql`
      create table if not exists messages (
        id integer generated by default as identity primary key,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        message text,
        "from" integer references users (id),
        "room" integer references rooms (id)
      )`;
    await sql`
      create or replace view
      public.rooms_activity as
    select
      rooms.id,
      rooms.name,
      rooms.status,
      max(messages.created_at) as last_message_at
    from
      rooms
      left join messages on messages.room = rooms.id
    group by
      rooms.id
    order by
      (max(messages.created_at)) desc nulls last;`;
    await sql`
      insert into rooms (id, name)
      values (0, 'Lobby')
      on conflict(id) do nothing`;
    await sql.end();
    return Promise.resolve(new Database());

    function getEnvOrThrow(name: string) {
      const value = Deno.env.get(name);
      if (value == null) {
        throw new Error(`Missing env variable: ${name}`);
      }
      return value;
    }
  },
});
