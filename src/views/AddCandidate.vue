<template>
    <div class="flex h-screen bg-gray-100">
      <Sidebar />
        <div class="flex-1 p-8 bg-white rounded-lg shadow-lg overflow-auto w-[1280px] ml-64">
        <h1 class="text-2xl font-bold text-center text-gray-700 mb-6">Tambah Kandidat</h1>
  
        <!-- Form -->
        <form @submit.prevent="submitForm" class="space-y-6 w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="nama" class="block text-sm font-semibold text-gray-600">Nama</label>
              <input type="text" v-model="formData.nama" id="nama" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Masukkan nama kandidat" required />
            </div>
            <div>
              <label for="role" class="block text-sm font-semibold text-gray-600">Role</label>
              <input type="text" v-model="formData.role" id="role" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Masukkan role" required />
            </div>
          </div>
  
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="jurusan" class="block text-sm font-semibold text-gray-600">Jurusan</label>
              <input type="text" v-model="formData.jurusan" id="jurusan" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Masukkan jurusan" required />
            </div>
            <div>
              <label for="kelas" class="block text-sm font-semibold text-gray-600">Kelas</label>
              <input type="text" v-model="formData.kelas" id="kelas" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Masukkan kelas" required />
            </div>
          </div>
  
          <div>
            <label for="foto" class="block text-sm font-semibold text-gray-600">Foto</label>
            <input type="file" @change="handleFileChange" id="foto" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
          </div>
  
          <div>
            <label for="visi_misi" class="block text-sm font-semibold text-gray-600">Visi dan Misi</label>
            <textarea v-model="formData.visi_misi" id="visi_misi" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Masukkan visi dan misi kandidat" required></textarea>
          </div>
  
          <div class="text-center">
            <button type="submit" class="px-6 py-3 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Tambah Kandidat</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; 
  import axios from 'axios';
  import Swal from 'sweetalert2'; 
  import Sidebar from '../components/SideBar.vue';
  
  const formData = ref({
    nama: '',
    role: '',
    jurusan: '',
    kelas: '',
    foto: null,
    visi_misi: ''
  });
  
  const router = useRouter(); 
  
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    router.push({ path: '/login' });
  }
  
  const handleFileChange = (event) => {
    formData.value.foto = event.target.files[0]; 
  };
  
  const submitForm = async () => {
    const formDataToSend = new FormData();
  
    formDataToSend.append('nama', formData.value.nama);
    formDataToSend.append('role', formData.value.role);
    formDataToSend.append('jurusan', formData.value.jurusan);
    formDataToSend.append('kelas', formData.value.kelas);
    if (formData.value.foto) {
      formDataToSend.append('foto', formData.value.foto); 
    }
    formDataToSend.append('visi_misi', formData.value.visi_misi);
  
    try {
      // kirim request POST ke API
      const response = await axios.post('http://127.0.0.1:8000/api/v1/admin/candidates', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
  
      Swal.fire({
        title: 'Berhasil!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
       
        formData.value = {
          nama: '',
          role: '',
          jurusan: '',
          kelas: '',
          foto: null,
          visi_misi: ''
        };
      });
    } catch (error) {
      Swal.fire({
        title: 'Gagal!',
        text: error.response ? error.response.data.message : error.message,
        icon: 'error',
        confirmButtonText: 'Coba Lagi'
      });
    }
  };
  </script>
  