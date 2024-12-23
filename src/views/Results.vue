<template>
  <sidebar />
  <div class="p-6 bg-white shadow-md rounded-lg w-[1000px]">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Hasil Pilkasis</h2>

    <div v-if="loading" class="text-gray-500 text-lg text-center mt-4">
      Memuat hasil Pilkasis...
    </div>

    <div v-if="results.ketua.length > 0" class="space-y-6">
      <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Ketua</h3>
      <div v-for="(result, index) in results.ketua" :key="index" class="flex justify-between py-3 border-b">
        <div class="bg-white shadow-md rounded-lg p-4 w-full mb-4">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-lg font-medium">{{ result.candidate_name }}</span>
              <span class="text-sm text-gray-500">Ketua</span>
            </div>
            <div class="text-lg font-semibold text-blue-600">{{ result.vote_count }} suara</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="results.wakil.length > 0" class="space-y-6 mt-6">
      <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">Wakil</h3>
      <div v-for="(result, index) in results.wakil" :key="index" class="flex justify-between py-3 border-b">
        <div class="bg-white shadow-md rounded-lg p-4 w-full mb-4">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-lg font-medium">{{ result.candidate_name }}</span>
              <span class="text-sm text-gray-500">Wakil</span>
            </div>
            <div class="text-lg font-semibold text-blue-600">{{ result.vote_count }} suara</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 text-lg text-center mt-4">
      Belum ada hasil Pilkasis yang tersedia.
    </div>
  </div>
</template>

<script setup>
import sidebar from '../components/SideBar.vue'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const results = ref({ ketua: [], wakil: [] }); 
const loading = ref(true); 
const router = useRouter(); 

const fetchResults = async () => {
  try {
    const token = localStorage.getItem('auth_token'); 
    if (!token) {
      router.push('/login');
      return;
    }

    const response = await axios.get('http://127.0.0.1:8000/api/v1/admin/vote/results', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    console.log('API Response:', response.data);

    if (response.data && response.data.data) {
      results.value.ketua = response.data.data.ketua || [];
      results.value.wakil = response.data.data.wakil || [];
    } else {
      results.value.ketua = [];
      results.value.wakil = [];
    }
  } catch (error) {
    console.error('Error fetching results:', error);
    results.value.ketua = [];
    results.value.wakil = [];
  } finally {
    loading.value = false; 
  }
};

onMounted(() => {
  fetchResults();
});
</script>


