import { Head } from "$fresh/runtime.ts";
import type { Handler } from "$fresh/server.ts";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login &middot; JPT</title>
      </Head>
      {["google", "github"].map((provider) => (
        <a href={`/auth/login?provider=${provider}`}>
          <button>Login with {provider}</button>
        </a>
      ))}
    </>
  );
}

export const handler: Handler = (_, ctx) => {
  if (ctx.state.user) {
    return new Response("Already logged in", {
      status: 307,
      headers: {
        Location: "/",
      },
    });
  }

  return ctx.render();
};
