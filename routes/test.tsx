export default function Test() {
  return (
    <>
    <div class="h-screen">
  <div class="z-10 w-full h-full flex items-center justify-center">
     <button id="modal-button" class="w-64 h-12 text-lg text-white bg-blue-500 rounded-md px-4 py-2">Open Modal</button> 
  </div> 
    <div id="modal" class="hidden items-center justify-center h-screen w-screen fixed top-0 bg-black bg-opacity-60"> 
        <div class="bg-white max-w-xl w-full rounded-md"> 
             <div class="p-3 flex items-center justify-between border-b border-b-gray-300"> 
                <h3 class="font-semibold text-xl">Modal Header</h3>
                <span class="modal-close cursor-pointer">×</span> 
            </div>
            <div class="p-3 border-b border-b-gray-300"> 
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nam excepturi repellendus amet, alias quia tenetur aut, perspiciatis assumenda deserunt iusto
                    incidunt.</p>
            </div>
            <div class="p-3 flex items-center justify-start"> 
                <div>
                    <button class="text-sm text-white bg-blue-500 rounded-md px-4 py-2">Accept</button>
                    <button class="modal-close text-sm text-gray-400 border rounded-md px-4 py-2">Decline</button> 
                </div>
            </div>
        </div>
    </div></div>
    
    </>
  );
}
