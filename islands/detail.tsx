import { server } from "@/communication/server.ts";
import twas from "twas";

import Edit from "@/component/edit.tsx";
export default function Detail({
  name,
  prompt: _prompt,
  roomId,
  userName,
  createAt,
  roomBy,
}: {
  name: string;
  prompt: string;
  roomId: number;
  userName: string;
  createAt: string;
  roomBy: string;
}) {
  const updateRoom = async ({
    prompt,
    name,
  }: {
    name?: string | undefined;
    prompt?: string | undefined;
  }) => {
    if (userName === "demo") {
      confirm("need login :)") && (document.location = "/login");
      return;
    }
    try {
      const res = await server.updateRoom({ prompt, name, roomId });
      if (res) location.reload();
    } catch (err) {
      console.error(err);
      alert(`Cannot update room, need permission !`);
    }
  };

  const onclickUpdate = (val: string) => {
    if (userName === "demo") {
      confirm("need login :)") && (document.location = "/login");
      return;
    }
    if (val === "name") {
      const nameRoom = prompt("change name room", name);

      if (nameRoom === name || !nameRoom || nameRoom === "") return 
        
updateRoom({ name:nameRoom });
      return;
    }
    const promptRoom = prompt("change prompt room", _prompt);
    if (promptRoom === _prompt || !promptRoom || promptRoom === "") return;
    
 updateRoom({ prompt: promptRoom });
  };

  return (
    <>
      <div class="detail-area">
        <div class="detail-area-header">
          <div class="msg-profile group">
            <img
              class="msg-profile"
              src={`/images/logos/jpt%20(${(roomId % 36) + 1}).jpg`}
              alt=""
            />{" "}
          </div>
          <div class="detail-title">
            <Edit onclick={() => onclickUpdate("name")} />
            {name}
          </div>
          <div class="detail-subtitle">
            Created by {roomBy ?? "demo"},{twas(new Date(createAt).getTime())}
          </div>
          <div
            class={`detail-change ${/[\u0600-\u06FF]/.test(_prompt) && "rtl"}`}
          >
            <Edit onclick={() => onclickUpdate("prompt")} />
            {_prompt}
          </div>
          {/*
          <div class="detail-buttons">
            <button class="detail-button">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-phone"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call Group
            </button>
            <button class="detail-button">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="0"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-video"
              >
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              Video Chat
            </button>
          </div>
       
  */}
        </div>
        <div class="detail-changes">
          <input type="text" placeholder="Search in Conversation" />
          <div class="detail-change">
            Change Color
            <div class="colors">
              <div class="color blue selected" data-color="blue"></div>
              <div class="color purple" data-color="purple"></div>
              <div class="color green" data-color="green"></div>
              <div class="color orange" data-color="orange"></div>
            </div>
          </div>
          {/*
          <div class="detail-change">
            Change Emoji
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-thumbs-up"
            >
              <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
            </svg>
          </div>
*/}
        </div>
        <div class="detail-photos">
          <div class="detail-photo-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-image"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          {/*
          <div class="detail-photo-grid">
            <img src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80" />
            <img src="https://images.unsplash.com/photo-1516085216930-c93a002a8b01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
            <img src="https://images.unsplash.com/photo-1458819714733-e5ab3d536722?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80" />
            <img src="https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2287&q=80" />
            <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2247&q=80" />
            <img src="https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80" />
            <img src="https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80" />
            <img src="https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2249&q=80" />
            <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2309&q=80" />

            <img src="https://images.unsplash.com/photo-1473170611423-22489201d919?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80" />
            <img src="https://images.unsplash.com/photo-1579613832111-ac7dfcc7723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80" />
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2189&q=80" />
          </div>
          */}
          <div class="view-more">View More</div>
        </div>
      </div>
    </>
  );
}
