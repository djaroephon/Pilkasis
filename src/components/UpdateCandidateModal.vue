<template>
    <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-xl font-bold mb-4">Update Candidate</h2>
        <form @submit.prevent="submitUpdate">
          <div class="mb-4">
            <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
            <input v-model="form.nama" type="text" id="nama" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div class="mb-4">
            <label for="jurusan" class="block text-sm font-medium text-gray-700">Jurusan</label>
            <input v-model="form.jurusan" type="text" id="jurusan" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
            <input v-model="form.role" type="text" id="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div class="mb-4">
            <label for="foto" class="block text-sm font-medium text-gray-700">Foto</label>
            <input @change="handleFileUpload" type="file" id="foto" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Update</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const props = defineProps(['candidate', 'show']); 
  const emit = defineEmits(['close', 'updated']); 
  
  const form = ref({ ...props.candidate }); 
  const file = ref(null);
  
  const closeModal = () => {
    emit('close');
  };
  
  const handleFileUpload = (event) => {
    file.value = event.target.files[0];
  };
  
  const submitUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('nama', form.value.nama);
      formData.append('jurusan', form.value.jurusan);
      formData.append('role', form.value.role);
      if (file.value) {
        formData.append('foto', file.value);
      }
  
      const response = await axios.put(`http://localhost:8000/api/v1/admin/candidates/${props.candidate.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      emit('updated', response.data); 
      closeModal();
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };
  </script>
  