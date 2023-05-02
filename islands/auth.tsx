
import * as supabase from "supabase";


const supabaseClient = supabase.createClient(
  Deno.env.get("SUPABASE_API_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!
);


export default function Auth() {    
  return (
    <>
    </>
  );
}
