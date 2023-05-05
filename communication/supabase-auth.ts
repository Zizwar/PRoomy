import { IS_BROWSER } from "$fresh/runtime.ts";
import { createClient, SupabaseClient } from "supabase";

export const createSupabaseClient = () => {
	if (IS_BROWSER) {
		//@ts-ignore: We are setting window.env.SUPABASE_URL and window.env.SUPABASE_ANON_KEY in the browser

		return createClient(
			Deno.env.get("SUPABASE_API_URL")!,
			Deno.env.get("SUPABASE_ANON_KEY")!
		  );
	}

	// We do this weird thing to trick the editor into thinking that this will always return a
	// SupabaseClient. This is because this file will only be used in the browser, there is
	// no need for the server to check anything
	return null as unknown as SupabaseClient;
};
export const supabaseAs = (access_token: string) => {
	return createClient(
		Deno.env.get("SUPABASE_API_URL")!,
		Deno.env.get("SUPABASE_ANON_KEY")!,
		{
			global: {
				headers: {
					"Authorization": `Bearer ${access_token}`,
				},
			},
		},
	);
};
export const supabase = createSupabaseClient();