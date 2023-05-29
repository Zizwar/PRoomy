export class GoogleAuth {
clientId: string|undefined;
clientSecret: string|undefined;
redirectUri: string|undefined;
  constructor() {
    this.clientId = Deno.env.get("GOOGLE_CLIENT_ID");
    this.clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");
    this.redirectUri = Deno.env.get("REDIRECT_URI");
  }

  async getAccessToken(code: string) {
    const response = await fetch(
      "https://accounts.google.com/o/oauth2/token",
      {
        method: "POST",
        body: JSON.stringify({
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: "authorization_code",
          redirect_uri:  this.redirectUri 
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();
    const accessToken = data["access_token"];
    if (typeof accessToken !== "string") {
      throw new Error("Access token was not a string.");
    }
    return accessToken;
  }

  async getUserData(accessToken: string) {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const userData = await response.json();
    const userName = userData.email.split("@")[0]+"-go";
     
    console.log("user google:",{userData})
    return  {
      userId:userData.sub,
      userName,
      avatarUrl: userData.picture
    };
  }
}

export const googleApi = new GoogleAuth();
