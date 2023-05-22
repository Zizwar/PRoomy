export default function Test() {
  return (
    <>

<div id="modal-container">
  <div class="modal-background">
    <div class="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
      <svg class="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
								<rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
							</svg>
    </div>
  </div>
</div>
<div class="content">
  <h1>Modal Animations</h1>
  <div class="buttons">
    <div id="one" class="button">Unfolding</div>
    <div id="two" class="button">Revealing</div>
    <div id="three" class="button">Uncovering</div>
    <div id="four" class="button">Blow Up</div><br>
    <div id="five" class="button">Meep Meep</div>
    <div id="six" class="button">Sketch</div>
    <div id="seven" class="button">Bond</div>
  </div>
</div>

<div class="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
  <div class="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
    <div class="h-16 text-blue-500 flex items-center justify-center">
      <svg class="w-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33">
        <path fill="currentColor" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
      <button class="h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center">
        <svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </button>
      <button class="h-10 w-12 dark:bg-gray-700 dark:text-white rounded-md flex items-center justify-center bg-blue-100 text-blue-500">
        <svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      </button>
      <button class="h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center">
        <svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
      </button>
      <button class="h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center">
        <svg viewBox="0 0 24 24" class="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
    </div>
  </div>
  <div class="flex-grow overflow-hidden h-full flex flex-col">
    <div class="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
      <div class="flex h-full text-gray-600 dark:text-gray-400">
        <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8">Company</a>
        <a href="#" class="cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center">Users</a>
        <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center mr-8">Expense Centres</a>
        <a href="#" class="cursor-pointer h-full border-b-2 border-transparent inline-flex items-center">Currency Exchange</a>
      </div>
      <div class="ml-auto flex items-center space-x-7">
        <button class="h-8 px-3 rounded-md shadow text-white bg-blue-500">Deposit</button>

        <button class="flex items-center">
          <span class="relative flex-shrink-0">
            <img class="w-7 h-7 rounded-full" src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="profile" />
            <span class="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
          </span>
          <span class="ml-2">James Smith</span>
          <svg viewBox="0 0 24 24" class="w-4 ml-1 flex-shrink-0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
    <div class="flex-grow flex overflow-x-hidden">
      <div class="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
        <div class="text-xs text-gray-400 tracking-wider">USERS</div>
        <div class="relative mt-2">
          <input type="text" class="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm" placeholder="Search" />
          <svg viewBox="0 0 24 24" class="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div class="space-y-4 mt-3">
          <button class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=046c29138c1335ef8edee7daf521ba50" class="w-7 h-7 mr-2 rounded-full" alt="profile" />
              Kathyrn Murphy
            </div>
            <div class="flex items-center w-full">
              <div class="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md">Design</div>
              <div class="ml-auto text-xs text-gray-500">$1,902.00</div>
            </div>
          </button>
          <button class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow-lg relative ring-2 ring-blue-500 focus:outline-none">
            <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
              <img src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1582611188&width=512" class="w-7 h-7 mr-2 rounded-full" alt="profile" />
              Mert Cukuren
            </div>
            <div class="flex items-center w-full">
              <div class="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md">Sales</div>
              <div class="ml-auto text-xs text-gray-500">$2,794.00</div>
            </div>
          </button>
          <button class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
              <img src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" class="w-7 h-7 mr-2 rounded-full" alt="profile" />
              Albert Flores
            </div>
            <div class="flex items-center w-full">
              <div class="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-yellow-100 text-yellow-600 rounded-md">Marketing</div>
              <div class="ml-auto text-xs text-gray-400">$0.00</div>
            </div>
          </button>
          <button class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
              <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" class="w-7 h-7 mr-2 rounded-full" alt="profile" />
              Jane Cooper
            </div>
            <div class="flex items-center w-full">
              <div class="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-blue-500 rounded-md">Design</div>
              <div class="ml-auto text-xs text-gray-500">$762.00</div>
            </div>
          </button>
          <button class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
            <div class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
              <img src="https://images.unsplash.com/photo-1507120878965-54b2d3939100?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=99fbace66d1bfa48c9c6dc8afcac3aab" class="w-7 h-7 mr-2 rounded-full" alt="profile" />
              Ronald Richards
            </div>
            <div class="flex items-center w-full">
              <div class="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-green-100 text-green-600 rounded-md">Sales</div>
              <div class="ml-auto text-xs text-gray-400">$0.00</div>
            </div>
          </button>
        </div>
      </div>
      <div class="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
        <div class="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
          <div class="flex w-full items-center">
            <div class="flex items-center text-3xl text-gray-900 dark:text-white">
              <img src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1582611188&width=512" class="w-12 mr-4 rounded-full" alt="profile" />
              Mert Cukuren
            </div>
            <div class="ml-auto sm:flex hidden items-center justify-end">
              <div class="text-right">
                <div class="text-xs text-gray-400 dark:text-gray-400">Account balance:</div>
                <div class="text-gray-900 text-lg dark:text-white">$2,794.00</div>
              </div>
              <button class="w-8 h-8 ml-4 text-gray-400 shadow dark:text-gray-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <svg viewBox="0 0 24 24" class="w-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex items-center space-x-3 sm:mt-7 mt-4">
            <a href="#" class="px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5">Activities</a>
            <a href="#" class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5">Transfer</a>
            <a href="#" class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Budgets</a>
            <a href="#" class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Notifications</a>
            <a href="#" class="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Cards</a>
          </div>
        </div>
        <div class="sm:p-7 p-4">
          <div class="flex w-full items-center mb-7">
            <button class="inline-flex mr-3 items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
              <svg viewBox="0 0 24 24" class="w-4 mr-2 text-gray-400 dark:text-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Last 30 days
              <svg viewBox="0 0 24 24" class="w-4 ml-1.5 text-gray-400 dark:text-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <button class="inline-flex items-center h-8 pl-2.5 pr-2 rounded-md shadow text-gray-700 dark:text-gray-400 dark:border-gray-800 border border-gray-200 leading-none py-0">
              Filter by
              <svg viewBox="0 0 24 24" class="w-4 ml-1.5 text-gray-400 dark:text-gray-600" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div class="ml-auto text-gray-500 text-xs sm:inline-flex hidden items-center">
              <span class="mr-3">Page 2 of 4</span>
              <button class="inline-flex mr-2 items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
                <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none py-0">
                <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <table class="w-full text-left">
            <thead>
              <tr class="text-gray-400">
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Type</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Where</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">Description</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Amount</th>
                <th class="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">Date</th>
              </tr>
            </thead>
            <tbody class="text-gray-600 dark:text-gray-100">
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-yellow-500" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <path fill="#03a9f4" d="M425.457 117.739c-3.121-1.838-6.961-1.966-10.197-.341-3.231 1.629-5.416 4.786-5.803 8.384-.384 3.499-.981 6.997-1.728 10.667-20.885 94.784-62.827 140.885-128.256 140.885h-96c-5.062.009-9.42 3.574-10.432 8.533l-32 149.995-5.717 38.187c-3.287 17.365 8.125 34.107 25.489 37.394 1.915.362 3.858.549 5.807.558h64.213c14.718.045 27.55-10 31.04-24.299l25.941-103.701h55.659c65.685 0 111.083-52.373 127.829-147.477 11.054-45.286-7.234-92.668-45.845-118.785z" />
                      <path fill="#283593" d="M405.339 38.017C384.261 14.108 354.012.286 322.139.001h-176.64C119.064-.141 96.558 19.2 92.721 45.355L37.873 411.243c-2.627 17.477 9.41 33.774 26.887 36.402 1.586.239 3.189.357 4.793.356h81.92c5.062-.009 9.42-3.574 10.432-8.533l30.187-140.8h87.467c75.904 0 126.059-53.056 149.099-157.867.926-4.178 1.638-8.4 2.133-12.651 5.348-32.335-3.981-65.372-25.452-90.133z" />
                    </svg>
                    PayPal
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Subscription renewal</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $120.00</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      24.12.2020
                      <div class="text-gray-400 text-xs">11:16 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <path fill="#f44336" d="M201.302 49.754l-192 24.939C3.949 75.384-.044 79.963 0 85.36v149.333c0 5.891 4.776 10.667 10.667 10.667h192c5.891 0 10.667-4.776 10.667-10.667V60.314c-.004-3.064-1.325-5.978-3.627-8-2.319-1.994-5.368-2.923-8.405-2.56z" />
                      <path fill="#4caf50" d="M508.374 13.36c-2.286-2.06-5.35-3.032-8.405-2.667l-256 33.387c-5.352.691-9.346 5.27-9.301 10.667v179.947c0 5.891 4.776 10.667 10.667 10.667h256c5.891 0 10.667-4.776 10.667-10.667V21.36c-.005-3.064-1.327-5.978-3.628-8z" />
                      <path fill="#2196f3" d="M202.667 266.693h-192C4.776 266.693 0 271.469 0 277.36v149.333c-.044 5.397 3.949 9.976 9.301 10.667l192 25.045c.455.031.911.031 1.365 0 5.891 0 10.667-4.776 10.667-10.667V277.36c.001-5.891-4.775-10.667-10.666-10.667z" />
                      <path fill="#ffc107" d="M501.334 266.693h-256c-5.891 0-10.667 4.776-10.667 10.667v179.947c-.044 5.397 3.949 9.976 9.301 10.667l256 33.387c.455.031.911.031 1.365 0 5.891 0 10.667-4.776 10.667-10.667V277.36c0-5.891-4.775-10.667-10.666-10.667z" />
                    </svg>
                    Microsoft
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Subscription renewal</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $9.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      24.12.2020
                      <div class="text-gray-400 text-xs">07:16 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <g fill="#37474f">
                        <path d="M461.852 355.712c-1.692-2.616-4.443-4.362-7.531-4.779-40.621-5.306-69.25-42.537-63.944-83.158 3.748-28.694 23.84-52.588 51.465-61.205 5.61-1.798 8.701-7.803 6.903-13.413-.28-.873-.671-1.707-1.164-2.481-18.641-33.642-51.786-56.779-89.792-62.677-19.152.914-38.026 4.957-55.872 11.968-12.817 5.158-26.351 8.317-40.128 9.365-13.777-1.048-27.311-4.207-40.128-9.365-17.846-7.011-36.72-11.054-55.872-11.968-39.829 0-117.333 56.469-117.333 160 0 98.389 71.765 224 128 224 21.457.192 42.656-4.691 61.867-14.251 7.235-3.99 15.232-6.404 23.467-7.083 8.234.679 16.232 3.093 23.467 7.083 19.211 9.56 40.41 14.443 61.867 14.251 44.587 0 94.912-76.544 115.989-147.477.882-2.979.422-6.197-1.261-8.81z" />
                        <path d="M251.121 128c64.772-.071 117.263-52.561 117.333-117.333C368.454 4.776 363.679 0 357.788 0c-64.772.071-117.263 52.561-117.333 117.333-.001 5.891 4.775 10.667 10.666 10.667z" />
                      </g>
                    </svg>
                    Apple
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Macbook Pro 13"</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $1.499.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      24.12.2020
                      <div class="text-gray-400 text-xs">11:03 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-green-500" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                    Income
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <img class="w-7 h-7 mr-2.5 border border-gray-200 dark:border-gray-800 rounded-full" src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="profile" />
                    James Smith
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Invoice No: 37401</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">+ $60.00</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      13.11.2020
                      <div class="text-gray-400 text-xs">09:45 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <g fill="#f44336">
                        <path d="M211.563 26.133c-1.971-2.993-5.313-4.796-8.896-4.8h-192C4.776 21.333 0 26.109 0 32v448c-.001 5.07 3.566 9.439 8.533 10.453.702.141 1.417.213 2.133.213 4.255.015 8.111-2.5 9.813-6.4l192-448c1.43-3.315 1.085-7.128-.916-10.133zM265.877 187.989c-1.632-4.021-5.537-6.653-9.877-6.656-4.293-.001-8.169 2.571-9.835 6.528l-85.333 202.667c-2.286 5.43.263 11.684 5.692 13.97 1.311.552 2.72.836 4.142.836h77.931l29.419 78.421c1.564 4.158 5.541 6.912 9.984 6.912h85.333c5.891-.004 10.664-4.782 10.66-10.673-.001-1.373-.267-2.732-.783-4.004L265.877 187.989zM501.333 21.333h-192c-5.891-.021-10.683 4.738-10.704 10.629-.005 1.481.298 2.947.89 4.304l192 448c1.702 3.9 5.559 6.415 9.813 6.4.716-.001 1.431-.072 2.133-.213 4.967-1.014 8.534-5.384 8.533-10.453V32c.002-5.891-4.774-10.667-10.665-10.667z" />
                      </g>
                    </svg>
                    Adobe
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Product purchased</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $49.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      10.03.2020
                      <div class="text-gray-400 text-xs">10:29 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427.652 427.652" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <path fill="#00d95f" d="M213.826 0C95.733 0 0 95.733 0 213.826s95.733 213.826 213.826 213.826 213.826-95.733 213.826-213.826S331.919 0 213.826 0zm93.06 310.32c-2.719 4.652-7.612 7.246-12.638 7.247-2.506 0-5.044-.645-7.364-2-38.425-22.456-82.815-26.065-113.295-25.138-33.763 1.027-58.523 7.692-58.769 7.76-7.783 2.126-15.826-2.454-17.961-10.236-2.134-7.781 2.43-15.819 10.209-17.962 1.116-.307 27.76-7.544 64.811-8.766 21.824-.72 42.834.801 62.438 4.52 24.83 4.71 47.48 12.978 67.322 24.574 6.973 4.074 9.321 13.03 5.247 20.001zm27.184-56.459c-3.22 5.511-9.016 8.583-14.97 8.584-2.968 0-5.975-.763-8.723-2.369-45.514-26.6-98.097-30.873-134.2-29.776-39.994 1.217-69.323 9.112-69.614 9.192-9.217 2.515-18.746-2.906-21.275-12.124-2.528-9.218 2.879-18.738 12.093-21.277 1.322-.364 32.882-8.937 76.77-10.384 25.853-.852 50.739.949 73.96 5.354 29.412 5.58 56.241 15.373 79.744 29.108 8.26 4.826 11.042 15.434 6.215 23.692zm16.711-51.335c-3.641 0-7.329-.936-10.7-2.906-108.207-63.238-248.572-25.643-249.977-25.255-11.313 3.117-23.008-3.527-26.124-14.839-3.117-11.312 3.527-23.008 14.839-26.124 1.621-.447 40.333-10.962 94.166-12.737 31.713-1.044 62.237 1.164 90.72 6.567 36.077 6.844 68.987 18.856 97.815 35.704 10.13 5.92 13.543 18.931 7.623 29.061-3.95 6.76-11.059 10.529-18.362 10.529z" />
                    </svg>
                    Spotify
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Subscription renewal</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $5.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      02.04.2020
                      <div class="text-gray-400 text-xs">10:29 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2.17 0.44 251.04 259.97" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <g fill="none" fill-rule="evenodd">
                        <path fill="#f90" fill-rule="nonzero" d="M221.5 210.32C116.27 260.41 50.96 218.5 9.15 193.05c-2.59-1.6-6.98.38-3.17 4.76 13.93 16.89 59.57 57.6 119.15 57.6 59.63 0 95.1-32.54 99.53-38.21 4.4-5.63 1.3-8.73-3.16-6.88zM251.06 194c-2.83-3.68-17.19-4.36-26.22-3.25-9.05 1.07-22.64 6.6-21.46 9.93.61 1.24 1.85.68 8.06.12 6.24-.62 23.7-2.82 27.34 1.93 3.66 4.8-5.57 27.61-7.25 31.3-1.63 3.67.62 4.62 3.68 2.17 3.01-2.45 8.47-8.8 12.14-17.77 3.64-9.03 5.85-21.63 3.7-24.43z" />
                        <path fill="#000" d="M150.74 108.13c0 13.14.34 24.1-6.3 35.77-5.37 9.49-13.86 15.32-23.35 15.32-12.95 0-20.5-9.86-20.5-24.43 0-28.75 25.77-33.97 50.15-33.97zm34.02 82.22a7.04 7.04 0 01-7.97.8c-11.2-9.3-13.19-13.61-19.36-22.48-18.5 18.88-31.6 24.52-55.6 24.52-28.37 0-50.48-17.5-50.48-52.56 0-27.38 14.85-46.02 35.96-55.13 18.32-8.06 43.89-9.49 63.43-11.72v-4.36c0-8.02.62-17.5-4.08-24.43-4.12-6.22-12-8.78-18.93-8.78-12.85 0-24.33 6.6-27.13 20.26-.57 3.03-2.8 6.02-5.84 6.16l-32.73-3.5c-2.75-.62-5.79-2.85-5.03-7.08C64.54 12.4 100.36.44 132.43.44c16.42 0 37.86 4.36 50.81 16.8 16.42 15.32 14.85 35.76 14.85 58.01v52.57c0 15.8 6.55 22.72 12.71 31.26 2.19 3.04 2.66 6.7-.1 8.97a1425.8 1425.8 0 00-25.85 22.4l-.1-.1" />
                        <path fill="#f90" fill-rule="nonzero" d="M221.5 210.32C116.27 260.41 50.96 218.5 9.15 193.05c-2.59-1.6-6.98.38-3.17 4.76 13.93 16.89 59.57 57.6 119.15 57.6 59.63 0 95.1-32.54 99.53-38.21 4.4-5.63 1.3-8.73-3.16-6.88zM251.06 194c-2.83-3.68-17.19-4.36-26.22-3.25-9.05 1.07-22.64 6.6-21.46 9.93.61 1.24 1.85.68 8.06.12 6.24-.62 23.7-2.82 27.34 1.93 3.66 4.8-5.57 27.61-7.25 31.3-1.63 3.67.62 4.62 3.68 2.17 3.01-2.45 8.47-8.8 12.14-17.77 3.64-9.03 5.85-21.63 3.7-24.43z" />
                        <path fill="#000" d="M150.74 108.13c0 13.14.34 24.1-6.3 35.77-5.37 9.49-13.86 15.32-23.35 15.32-12.95 0-20.5-9.86-20.5-24.43 0-28.75 25.77-33.97 50.15-33.97zm34.02 82.22a7.04 7.04 0 01-7.97.8c-11.2-9.3-13.19-13.61-19.36-22.48-18.5 18.88-31.6 24.52-55.6 24.52-28.37 0-50.48-17.5-50.48-52.56 0-27.38 14.85-46.02 35.96-55.13 18.32-8.06 43.89-9.49 63.43-11.72v-4.36c0-8.02.62-17.5-4.08-24.43-4.12-6.22-12-8.78-18.93-8.78-12.85 0-24.33 6.6-27.13 20.26-.57 3.03-2.8 6.02-5.84 6.16l-32.73-3.5c-2.75-.62-5.79-2.85-5.03-7.08C64.54 12.4 100.36.44 132.43.44c16.42 0 37.86 4.36 50.81 16.8 16.42 15.32 14.85 35.76 14.85 58.01v52.57c0 15.8 6.55 22.72 12.71 31.26 2.19 3.04 2.66 6.7-.1 8.97a1425.8 1425.8 0 00-25.85 22.4l-.1-.1" />
                      </g>
                    </svg>
                    Amazon
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">PlayStation 5</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $399.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      08.09.2020
                      <div class="text-gray-400 text-xs">11:00 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-green-500" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                    Income
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <img class="w-7 h-7 mr-2.5 border border-gray-200 dark:border-gray-800 rounded-full" src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="profile" />
                    Jane Cooper
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Invoice No: 12993</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">+ $24.00</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      01.04.2020
                      <div class="text-gray-400 text-xs">09:45 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-yellow-500" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <path fill="#03a9f4" d="M425.457 117.739c-3.121-1.838-6.961-1.966-10.197-.341-3.231 1.629-5.416 4.786-5.803 8.384-.384 3.499-.981 6.997-1.728 10.667-20.885 94.784-62.827 140.885-128.256 140.885h-96c-5.062.009-9.42 3.574-10.432 8.533l-32 149.995-5.717 38.187c-3.287 17.365 8.125 34.107 25.489 37.394 1.915.362 3.858.549 5.807.558h64.213c14.718.045 27.55-10 31.04-24.299l25.941-103.701h55.659c65.685 0 111.083-52.373 127.829-147.477 11.054-45.286-7.234-92.668-45.845-118.785z" />
                      <path fill="#283593" d="M405.339 38.017C384.261 14.108 354.012.286 322.139.001h-176.64C119.064-.141 96.558 19.2 92.721 45.355L37.873 411.243c-2.627 17.477 9.41 33.774 26.887 36.402 1.586.239 3.189.357 4.793.356h81.92c5.062-.009 9.42-3.574 10.432-8.533l30.187-140.8h87.467c75.904 0 126.059-53.056 149.099-157.867.926-4.178 1.638-8.4 2.133-12.651 5.348-32.335-3.981-65.372-25.452-90.133z" />
                    </svg>
                    PayPal
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Subscription renewal</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $120.00</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      24.12.2020
                      <div class="text-gray-400 text-xs">11:16 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <path fill="#f44336" d="M201.302 49.754l-192 24.939C3.949 75.384-.044 79.963 0 85.36v149.333c0 5.891 4.776 10.667 10.667 10.667h192c5.891 0 10.667-4.776 10.667-10.667V60.314c-.004-3.064-1.325-5.978-3.627-8-2.319-1.994-5.368-2.923-8.405-2.56z" />
                      <path fill="#4caf50" d="M508.374 13.36c-2.286-2.06-5.35-3.032-8.405-2.667l-256 33.387c-5.352.691-9.346 5.27-9.301 10.667v179.947c0 5.891 4.776 10.667 10.667 10.667h256c5.891 0 10.667-4.776 10.667-10.667V21.36c-.005-3.064-1.327-5.978-3.628-8z" />
                      <path fill="#2196f3" d="M202.667 266.693h-192C4.776 266.693 0 271.469 0 277.36v149.333c-.044 5.397 3.949 9.976 9.301 10.667l192 25.045c.455.031.911.031 1.365 0 5.891 0 10.667-4.776 10.667-10.667V277.36c.001-5.891-4.775-10.667-10.666-10.667z" />
                      <path fill="#ffc107" d="M501.334 266.693h-256c-5.891 0-10.667 4.776-10.667 10.667v179.947c-.044 5.397 3.949 9.976 9.301 10.667l256 33.387c.455.031.911.031 1.365 0 5.891 0 10.667-4.776 10.667-10.667V277.36c0-5.891-4.775-10.667-10.666-10.667z" />
                    </svg>
                    Microsoft
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Subscription renewal</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $9.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      24.12.2020
                      <div class="text-gray-400 text-xs">07:16 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <g fill="#37474f">
                        <path d="M461.852 355.712c-1.692-2.616-4.443-4.362-7.531-4.779-40.621-5.306-69.25-42.537-63.944-83.158 3.748-28.694 23.84-52.588 51.465-61.205 5.61-1.798 8.701-7.803 6.903-13.413-.28-.873-.671-1.707-1.164-2.481-18.641-33.642-51.786-56.779-89.792-62.677-19.152.914-38.026 4.957-55.872 11.968-12.817 5.158-26.351 8.317-40.128 9.365-13.777-1.048-27.311-4.207-40.128-9.365-17.846-7.011-36.72-11.054-55.872-11.968-39.829 0-117.333 56.469-117.333 160 0 98.389 71.765 224 128 224 21.457.192 42.656-4.691 61.867-14.251 7.235-3.99 15.232-6.404 23.467-7.083 8.234.679 16.232 3.093 23.467 7.083 19.211 9.56 40.41 14.443 61.867 14.251 44.587 0 94.912-76.544 115.989-147.477.882-2.979.422-6.197-1.261-8.81z" />
                        <path d="M251.121 128c64.772-.071 117.263-52.561 117.333-117.333C368.454 4.776 363.679 0 357.788 0c-64.772.071-117.263 52.561-117.333 117.333-.001 5.891 4.775 10.667 10.666 10.667z" />
                      </g>
                    </svg>
                    Apple
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Macbook Pro 13"</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $1.499.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      24.12.2020
                      <div class="text-gray-400 text-xs">11:03 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-green-500" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                    Income
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <img class="w-7 h-7 mr-2.5 border border-gray-200 dark:border-gray-800 rounded-full" src="https://images.unsplash.com/photo-1521587765099-8835e7201186?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="profile" />
                    James Smith
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Invoice No: 37401</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">+ $60.00</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      13.11.2020
                      <div class="text-gray-400 text-xs">09:45 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <g fill="#f44336">
                        <path d="M211.563 26.133c-1.971-2.993-5.313-4.796-8.896-4.8h-192C4.776 21.333 0 26.109 0 32v448c-.001 5.07 3.566 9.439 8.533 10.453.702.141 1.417.213 2.133.213 4.255.015 8.111-2.5 9.813-6.4l192-448c1.43-3.315 1.085-7.128-.916-10.133zM265.877 187.989c-1.632-4.021-5.537-6.653-9.877-6.656-4.293-.001-8.169 2.571-9.835 6.528l-85.333 202.667c-2.286 5.43.263 11.684 5.692 13.97 1.311.552 2.72.836 4.142.836h77.931l29.419 78.421c1.564 4.158 5.541 6.912 9.984 6.912h85.333c5.891-.004 10.664-4.782 10.66-10.673-.001-1.373-.267-2.732-.783-4.004L265.877 187.989zM501.333 21.333h-192c-5.891-.021-10.683 4.738-10.704 10.629-.005 1.481.298 2.947.89 4.304l192 448c1.702 3.9 5.559 6.415 9.813 6.4.716-.001 1.431-.072 2.133-.213 4.967-1.014 8.534-5.384 8.533-10.453V32c.002-5.891-4.774-10.667-10.665-10.667z" />
                      </g>
                    </svg>
                    Adobe
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Product purchased</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $49.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      10.03.2020
                      <div class="text-gray-400 text-xs">10:29 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427.652 427.652" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <path fill="#00d95f" d="M213.826 0C95.733 0 0 95.733 0 213.826s95.733 213.826 213.826 213.826 213.826-95.733 213.826-213.826S331.919 0 213.826 0zm93.06 310.32c-2.719 4.652-7.612 7.246-12.638 7.247-2.506 0-5.044-.645-7.364-2-38.425-22.456-82.815-26.065-113.295-25.138-33.763 1.027-58.523 7.692-58.769 7.76-7.783 2.126-15.826-2.454-17.961-10.236-2.134-7.781 2.43-15.819 10.209-17.962 1.116-.307 27.76-7.544 64.811-8.766 21.824-.72 42.834.801 62.438 4.52 24.83 4.71 47.48 12.978 67.322 24.574 6.973 4.074 9.321 13.03 5.247 20.001zm27.184-56.459c-3.22 5.511-9.016 8.583-14.97 8.584-2.968 0-5.975-.763-8.723-2.369-45.514-26.6-98.097-30.873-134.2-29.776-39.994 1.217-69.323 9.112-69.614 9.192-9.217 2.515-18.746-2.906-21.275-12.124-2.528-9.218 2.879-18.738 12.093-21.277 1.322-.364 32.882-8.937 76.77-10.384 25.853-.852 50.739.949 73.96 5.354 29.412 5.58 56.241 15.373 79.744 29.108 8.26 4.826 11.042 15.434 6.215 23.692zm16.711-51.335c-3.641 0-7.329-.936-10.7-2.906-108.207-63.238-248.572-25.643-249.977-25.255-11.313 3.117-23.008-3.527-26.124-14.839-3.117-11.312 3.527-23.008 14.839-26.124 1.621-.447 40.333-10.962 94.166-12.737 31.713-1.044 62.237 1.164 90.72 6.567 36.077 6.844 68.987 18.856 97.815 35.704 10.13 5.92 13.543 18.931 7.623 29.061-3.95 6.76-11.059 10.529-18.362 10.529z" />
                    </svg>
                    Spotify
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Subscription renewal</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $5.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      02.04.2020
                      <div class="text-gray-400 text-xs">10:29 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-gray-400" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Card
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2.17 0.44 251.04 259.97" class="w-7 h-7 p-1.5 mr-2.5 rounded-lg border border-gray-200 dark:border-gray-800">
                      <g fill="none" fill-rule="evenodd">
                        <path fill="#f90" fill-rule="nonzero" d="M221.5 210.32C116.27 260.41 50.96 218.5 9.15 193.05c-2.59-1.6-6.98.38-3.17 4.76 13.93 16.89 59.57 57.6 119.15 57.6 59.63 0 95.1-32.54 99.53-38.21 4.4-5.63 1.3-8.73-3.16-6.88zM251.06 194c-2.83-3.68-17.19-4.36-26.22-3.25-9.05 1.07-22.64 6.6-21.46 9.93.61 1.24 1.85.68 8.06.12 6.24-.62 23.7-2.82 27.34 1.93 3.66 4.8-5.57 27.61-7.25 31.3-1.63 3.67.62 4.62 3.68 2.17 3.01-2.45 8.47-8.8 12.14-17.77 3.64-9.03 5.85-21.63 3.7-24.43z" />
                        <path fill="#000" d="M150.74 108.13c0 13.14.34 24.1-6.3 35.77-5.37 9.49-13.86 15.32-23.35 15.32-12.95 0-20.5-9.86-20.5-24.43 0-28.75 25.77-33.97 50.15-33.97zm34.02 82.22a7.04 7.04 0 01-7.97.8c-11.2-9.3-13.19-13.61-19.36-22.48-18.5 18.88-31.6 24.52-55.6 24.52-28.37 0-50.48-17.5-50.48-52.56 0-27.38 14.85-46.02 35.96-55.13 18.32-8.06 43.89-9.49 63.43-11.72v-4.36c0-8.02.62-17.5-4.08-24.43-4.12-6.22-12-8.78-18.93-8.78-12.85 0-24.33 6.6-27.13 20.26-.57 3.03-2.8 6.02-5.84 6.16l-32.73-3.5c-2.75-.62-5.79-2.85-5.03-7.08C64.54 12.4 100.36.44 132.43.44c16.42 0 37.86 4.36 50.81 16.8 16.42 15.32 14.85 35.76 14.85 58.01v52.57c0 15.8 6.55 22.72 12.71 31.26 2.19 3.04 2.66 6.7-.1 8.97a1425.8 1425.8 0 00-25.85 22.4l-.1-.1" />
                        <path fill="#f90" fill-rule="nonzero" d="M221.5 210.32C116.27 260.41 50.96 218.5 9.15 193.05c-2.59-1.6-6.98.38-3.17 4.76 13.93 16.89 59.57 57.6 119.15 57.6 59.63 0 95.1-32.54 99.53-38.21 4.4-5.63 1.3-8.73-3.16-6.88zM251.06 194c-2.83-3.68-17.19-4.36-26.22-3.25-9.05 1.07-22.64 6.6-21.46 9.93.61 1.24 1.85.68 8.06.12 6.24-.62 23.7-2.82 27.34 1.93 3.66 4.8-5.57 27.61-7.25 31.3-1.63 3.67.62 4.62 3.68 2.17 3.01-2.45 8.47-8.8 12.14-17.77 3.64-9.03 5.85-21.63 3.7-24.43z" />
                        <path fill="#000" d="M150.74 108.13c0 13.14.34 24.1-6.3 35.77-5.37 9.49-13.86 15.32-23.35 15.32-12.95 0-20.5-9.86-20.5-24.43 0-28.75 25.77-33.97 50.15-33.97zm34.02 82.22a7.04 7.04 0 01-7.97.8c-11.2-9.3-13.19-13.61-19.36-22.48-18.5 18.88-31.6 24.52-55.6 24.52-28.37 0-50.48-17.5-50.48-52.56 0-27.38 14.85-46.02 35.96-55.13 18.32-8.06 43.89-9.49 63.43-11.72v-4.36c0-8.02.62-17.5-4.08-24.43-4.12-6.22-12-8.78-18.93-8.78-12.85 0-24.33 6.6-27.13 20.26-.57 3.03-2.8 6.02-5.84 6.16l-32.73-3.5c-2.75-.62-5.79-2.85-5.03-7.08C64.54 12.4 100.36.44 132.43.44c16.42 0 37.86 4.36 50.81 16.8 16.42 15.32 14.85 35.76 14.85 58.01v52.57c0 15.8 6.55 22.72 12.71 31.26 2.19 3.04 2.66 6.7-.1 8.97a1425.8 1425.8 0 00-25.85 22.4l-.1-.1" />
                      </g>
                    </svg>
                    Amazon
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">PlayStation 5</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500">- $399.99</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      08.09.2020
                      <div class="text-gray-400 text-xs">11:00 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <svg viewBox="0 0 24 24" class="w-4 mr-5 text-green-500" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                    Income
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <img class="w-7 h-7 mr-2.5 border border-gray-200 dark:border-gray-800 rounded-full" src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" alt="profile" />
                    Jane Cooper
                  </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">Invoice No: 12993</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-green-500">+ $24.00</td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                  <div class="flex items-center">
                    <div class="sm:flex hidden flex-col">
                      01.04.2020
                      <div class="text-gray-400 text-xs">09:45 AM</div>
                    </div>
                    <button class="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                      <svg viewBox="0 0 24 24" class="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="19" cy="12" r="1"></circle>
                        <circle cx="5" cy="12" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex w-full mt-5 space-x-2 justify-end">
            <button class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
              <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">1</button>
            <button class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 dark:text-white leading-none">2</button>
            <button class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">3</button>
            <button class="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">4</button>
            <button class="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
              <svg class="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</>
);
}