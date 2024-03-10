<template>
  <nav class="bg-gradient-to-r from-blue-500 to-blue-800 h-40">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
      <div class="flex flex-col justify-center items-start">
        <h1 class="text-4xl font-extrabold tracking-tight text-white mr-4">
          Welcome to ProPlaner
        </h1>
        <p class="text-lg text-gray-200">Organize. Plan. Achieve.</p>
      </div>
      <div class="flex items-center space-x-8">
        <!-- Sign Up button -->
        <button class="text-white px-4 py-2 rounded-md font-medium bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring">Sign Up</button>
        <!-- Login button -->
        <button class="text-blue-800 bg-white px-4 py-2 rounded-md font-medium hover:bg-blue-100 focus:outline-none focus:ring">Login</button>
        <!-- User profile icon -->
        <div class="relative ml-auto"> <!-- Added ml-auto to move it to the right -->
          <button class="bg-white p-2 rounded-full focus:outline-none focus:ring">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-800" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M3 6a3 3 0 100 6h14a3 3 0 100-6H3zm14-4a5 5 0 00-5 5h-4a5 5 0 00-5-5H4a6 6 0 0112 0h-1z" clip-rule="evenodd" />
            </svg>
          </button>
          <!-- Notification indicator -->
          <div class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Add any additional styling here */
</style>
