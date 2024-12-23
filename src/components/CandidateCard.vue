<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <div
      v-for="candidate in candidates"
      :key="candidate.id"
      class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow w-[200px]"
    >
      <img
        :src="candidate.foto ? `http://127.0.0.1:8000/storage/${candidate.foto}` : '/default-image.jpg'"
        :alt="`Foto ${candidate.nama}`"
        class="w-full h-[210px] object-cover"
      />
      <div class="p-4">
        <h2 class="text-lg font-bold text-gray-800 text-center">{{ candidate.nama }}</h2>
        <h4 class="text-center font-bold text-gray-600">{{ candidate.role + " OSIS" }}</h4>
        
        <div class="mt-4 flex justify-between">
          <button 
            class="bg-yellow-400 text-white px-3 py-1 text-md rounded-md hover:bg-yellow-500 transition duration-300"
            @click="updateCandidate(candidate.id)"
          >
            Update
          </button>
          <button 
            class="bg-red-500 text-white px-3 py-1 text-md rounded-md hover:bg-red-600 transition duration-300"
            @click="deleteCandidate(candidate.id)"
          >
            Delete
          </button>
        </div>
      </div>
      <UpdateCandidateModal/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import UpdateCandidateModal from './UpdateCandidateModal.vue';

const candidates = ref([]);

const fetchCandidates = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/candidates');
    candidates.value = response.data.data;
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
};

const updateCandidate = (id) => {
  console.log(`Update candidate with ID: ${id}`);
};

const deleteCandidate = (id) => {
  console.log(`Delete candidate with ID: ${id}`);
  
};

onMounted(fetchCandidates);
</script>
