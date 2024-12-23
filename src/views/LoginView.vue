<template>
  <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
    <div v-if="!role" class="space-y-6">
      <h2 class="text-3xl font-semibold text-center text-gray-800">Pilih Role untuk Login</h2>
      <div class="space-y-4">
        <button 
          @click="redirectToLogin('siswa')" 
          class="w-full py-3 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-700 transition-colors duration-300"
        >
          Siswa
        </button>
        <button 
          @click="redirectToLogin('guru')" 
          class="w-full py-3 bg-green-600 text-white rounded-lg text-xl hover:bg-green-700 transition-colors duration-300"
        >
          Guru
        </button>
        <button 
          @click="redirectToLogin('admin')" 
          class="w-full py-3 bg-red-600 text-white rounded-lg text-xl hover:bg-red-700 transition-colors duration-300"
        >
          Admin
        </button>
      </div>
      <p class="text-center text-gray-600 text-sm">Pilih role yang sesuai untuk melanjutkan login.</p>
    </div>

    <div v-else class="space-y-6">
      <h2 class="text-3xl font-semibold text-center text-gray-800">Login Sebagai {{ role }}</h2>
      <form @submit.prevent="submitLogin" class="space-y-4">
        <div>
          <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
          <input 
            v-model="nama" 
            type="text" 
            id="nama" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Nama Anda" 
          />
        </div>
        
        <!-- Input khusus admin -->
        <div v-if="role === 'admin'">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Password Anda" 
          />
        </div>
        
        <!-- Input tambahan untuk siswa -->
        <div v-if="role === 'siswa'">
          <div>
            <label for="kelas" class="block text-sm font-medium text-gray-700">Kelas</label>
            <input 
              v-model="kelas" 
              type="text" 
              id="kelas" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Kelas Anda"
              :inputmode="numeric"
            />
          </div>
          <div>
            <label for="jurusan" class="block text-sm font-medium text-gray-700">Jurusan</label>
            <input 
              v-model="jurusan" 
              type="text" 
              id="jurusan" 
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Jurusan Anda" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          class="w-full py-3 bg-blue-600 text-white rounded-lg text-xl hover:bg-blue-700 transition-colors duration-300"
        >
          Login
        </button>
      </form>
      <button 
        @click="goBack"
        class="w-full py-3 bg-gray-400 text-white rounded-lg text-xl hover:bg-gray-500 transition-colors duration-300"
      >
        Kembali
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();

// State untuk form
const role = ref(route.query.role || ''); // Ambil role dari URL
const nama = ref('');
const password = ref('');
const kelas = ref('');
const jurusan = ref('');

// Redirect ke login dengan role
const redirectToLogin = (roleValue) => {
  router.push({ path: '/login', query: { role: roleValue } });
  role.value = roleValue;
};

// Submit login
const submitLogin = async () => {
  const loginData = {
    nama: nama.value,
    role: role.value,
    ...(role.value === 'siswa' && { kelas: kelas.value, jurusan: jurusan.value }),
    ...(role.value === 'admin' && { password: password.value })
  };

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/v1/login', loginData);
    localStorage.setItem('auth_token', response.data.token);

    if (role.value === 'admin') {
      router.push({ name: 'admin-dashboard' });
    } else {
      router.push({ name: 'vote' });
    }
  } catch (error) {
    alert('Login gagal. Periksa data yang dimasukkan.');
  }
};

// Kembali ke halaman sebelumnya
const goBack = () => {
  role.value = '';
};
</script>
