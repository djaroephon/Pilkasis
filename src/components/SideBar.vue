<template>
  <div class="flex h-screen bg-gray-100 fixed top-0 left-0">
    <aside class="w-64 bg-white shadow-lg">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-center py-6 bg-green-500">
          <h1 class="text-2xl font-bold text-white">Pilkasis</h1>
        </div>
        <nav class="flex-1 px-4 py-6 space-y-4">
          <router-link
            to="/admin/dashboard"
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L4 9v12h16V9l-8-6zm0 2.18L18 9v10H6V9l6-3.82zM12 12a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
            </svg>
            Home
          </router-link>

          <div class="relative">
            <button
              @click="toggleDropdown"
              class="flex items-center w-full px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L12 12.586l5.293-5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Candidates
            </button>
            <div v-show="isDropdownOpen" class="mt-2 space-y-2 px-4">
              <router-link
                to="/admin/candidates/add"
                class="block px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-colors"
              >
                Add Candidates
              </router-link>
            </div>
          </div>
          <router-link
            to="/admin/results"
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM4 12l2.586-2.586L8 12l-1.414 1.414L4 12zm8 6a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
            Results
          </router-link>
          <router-link 
              to="/admin/register"
              class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM13 7h-2v6h2V7zm-2 8h2v2h-2v-2z" />
              </svg>
              Register
          </router-link>
        </nav>

        <div class="px-4 py-6">
          <button
            @click="logout"
            class="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isDropdownOpen = ref(false);
const router = useRouter();

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  localStorage.removeItem('auth_token');
  router.push('/login');
};
</script>
