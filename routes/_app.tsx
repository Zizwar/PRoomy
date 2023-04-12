

import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />

        <meta charset="UTF-8" />
        <title>ChatDPT</title>

        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="ChatDpt" />
        <meta property="og:title" content="ChatDpt" />
        <meta property="og:description" content="ChatDpt" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="gpt, oprnai, Deno, DenoLand, Development, JavaScript, TypeScript, chat, ai"
        />

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"/>
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'/>

        <link rel="stylesheet" href="/css/home.css"></link>
   
       
      </Head>
      <Component /> 
      <script src="/js/script.js">
        </script>
    </div>
  );
}