
import { supabase } from "@/communication/supabase-auth.ts";
import { Provider } from "https://esm.sh/v102/@supabase/gotrue-js@2.6.1/dist/module/lib/types";
import { IS_BROWSER } from "$fresh/runtime.ts";
//import * as supabase from "supabase";

export default function Auth() {

 const login = (provider: Provider) => { 
 console.log({provider})

		supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: window.location.origin + "/chat/2",
			},
		});
	};

	return (
		<div style={{display:"flex"}}>
			<a
				icon="google"
				
				onClick={() => login("google")}
				disabled={!IS_BROWSER}
			>
				Login with Google
			</a>
      <br/>
			<a
				icon="github"
				
				onClick={() => login("github")}
				disabled={!IS_BROWSER}
			>
				Login with GitHub
			</a>
			<br/>
      <a
				icon="gitlab"
				
				onClick={() => login("gitlab")}
				disabled={!IS_BROWSER}
			>
				Login with GitLab
			</a>
		</div>
	);
}


