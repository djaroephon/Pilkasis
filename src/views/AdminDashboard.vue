<template>
  <div class="flex h-screen  ">
    <Sidebar />
    <main class="flex-1 p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Welcome to Admin</h1>

      <section>
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Candidates</h2>
        <CandidatesCard :candidates="candidates" />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import Sidebar from '../components/SideBar.vue';
import CandidatesCard from '../components/CandidateCard.vue';

const candidates = ref([]);
const router = useRouter(); 

const token = localStorage.getItem('auth_token');

if (!token) {
 
  router.push({ path: '/login' });
}

const fetchCandidates = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/v1/candidates', {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });
    candidates.value = response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
};

onMounted(fetchCandidates);
</script>
