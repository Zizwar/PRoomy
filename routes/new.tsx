import { Head } from "$fresh/runtime.ts";
import { Page } from "@/helpers/Page.tsx";
import AddRoom from "@/islands/AddRoom.tsx";

export default function NewRoom() {
  return (
    <>
      <Head>
        <title>New Room | Deno Chat</title>
      </Head>
      <Page>
        <div class="rounded-2xl w-5/6 md:w-5/12 max-w-xl pt-4 pb-8 px-7">
          <div class="h-8 flex-none flex justify-between items-center mb-9">
            <a
              href="/"
              class="h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-200 rounded-2xl"
            >
              <img src="/arrow.svg" alt="Left Arrow" />
            </a>
            <div class="font-medium text-lg flex items-center">
              <div class="w-6 h-6 flex justify-center items-center mr-1.5">
                <img src="/plus.svg" alt="Plus" />
              </div>
              New Room
            </div>
            <div />
          </div>
          <AddRoom />

<!-- Button trigger modal -->
<button type="button" class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg" data-modal-toggle="modal">Open Modal</button>

<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal Title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>This is the modal body.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-secondary">Save</button>
      </div>
    </div>
  </div>
</div>


       </div>
      </Page>
    </>
  );
}
