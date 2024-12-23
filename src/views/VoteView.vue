<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-semibold text-center mb-8 text-gray-800">Pilih Kandidat Ketua dan Wakil OSIS</h1>

    <div v-if="candidates.length === 0" class="text-center text-lg text-gray-500">Tidak ada kandidat tersedia untuk dipilih.</div>

    <div v-if="!hasVotedKetua" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <div v-for="candidate in candidates" :key="candidate.id" class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
        <img
          :src="getImageUrl(candidate.foto)"
          :alt="`Foto ${candidate.nama}`"
          class="w-full h-[310px] object-cover"
        />
        <div class="p-6">
          <h2 class="text-2xl font-semibold text-gray-800">{{ candidate.nama }}</h2>
          <p class="text-lg text-gray-600">{{ candidate.role }}</p>

          <div class="mt-6 flex justify-between">
            <button
              class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              @click="showVisiMisi(candidate)"
            >
              Lihat Visi Misi
            </button>
            <button
              :disabled="!hasSeenVisiMisi"
              class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50"
              @click="voteKetua(candidate.id)"
            >
              Vote Ketua
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="hasVotedKetua" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      <div v-for="candidate in candidatesWakil" :key="candidate.id" class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all">
        <img
          :src="getImageUrl(candidate.foto)"
          :alt="`Foto ${candidate.nama}`"
          class="w-full h-[310px] object-cover"
        />
        <div class="p-6">
          <h2 class="text-2xl font-semibold text-gray-800">{{ candidate.nama }}</h2>
          <p class="text-lg text-gray-600">{{ candidate.role }}</p>

          <div class="mt-6 flex justify-between">
            <button
              class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              @click="showVisiMisi(candidate)"
            >
              Lihat Visi Misi
            </button>
            <button
              :disabled="!hasSeenVisiMisi"
              class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50"
              @click="voteWakil(candidate.id)"
            >
              Vote Wakil
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg max-w-lg w-full">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Visi Misi Kandidat</h2>
        <p class="text-lg text-gray-600">{{ selectedCandidate?.visi_misi }}</p>
        <div class="mt-6 flex justify-end">
          <button class="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../utils/axios';
import Swal from 'sweetalert2';

const router = useRouter();

const candidates = ref([]);
const candidatesWakil = ref([]);
const selectedCandidate = ref(null);
const isModalOpen = ref(false);
const hasSeenVisiMisi = ref(false);
const hasVotedKetua = ref(false);

const token = localStorage.getItem('auth_token');
if (!token) {
  router.push({ path: '/login' });
}

const getCandidates = async () => {
  try {
    const response = await api.get('/v1/candidates');
    candidates.value = response.data.data.filter(c => c.role === 'ketua');
    candidatesWakil.value = response.data.data.filter(c => c.role === 'wakil');
  } catch (error) {
    console.error(error);
  }
};

const showVisiMisi = (candidate) => {
  selectedCandidate.value = candidate;
  isModalOpen.value = true;
  hasSeenVisiMisi.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const voteKetua = async (candidateId) => {
  try {
    await api.post('/v1/vote', { candidate_id: candidateId, role: 'ketua' });
    Swal.fire('Vote Berhasil!', 'Anda telah memilih Ketua OSIS.', 'success');
    hasVotedKetua.value = true;
  } catch (error) {
    console.error(error);
    Swal.fire('Gagal!', 'Terjadi kesalahan saat vote.', 'error');
  }
};

const voteWakil = async (candidateId) => {
  try {
    await api.post('/v1/vote', { candidate_id: candidateId, role: 'wakil' });
    Swal.fire('Vote Berhasil!', 'Anda telah memilih Wakil Ketua OSIS.', 'success');
    localStorage.removeItem('auth_token');
    router.push({ path: '/' });
  } catch (error) {
    console.error(error);
    Swal.fire('Gagal!', 'Terjadi kesalahan saat vote.', 'error');
  }
};

const getImageUrl = (foto) => {
  return `http://127.0.0.1:8000/storage/${foto}`;
};

onMounted(getCandidates);
</script>

