<script setup>
import sidebar from '../components/SideBar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const formData = ref({
    nama: '',
    password: ''
});

const router = useRouter();
const token = localStorage.getItem('auth_token');
const loading = ref(false);
const showPassword = ref(false); 

if (!token) {
    router.push('/'); 
}

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const submitData = async () => {
    if (formData.value.nama.trim() === '' || formData.value.password.trim() === '') {
        alert('Nama dan Password harus diisi!');
        return;
    }

    if (formData.value.password.length < 6) {
        alert('Password harus memiliki minimal 6 karakter!');
        return;
    }

    loading.value = true;
    try {
        const response = await axios.post(
            'http://localhost:8000/api/v1/admin/register',
            {
                nama: formData.value.nama,
                password: formData.value.password
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        alert(response.data.message);
    } catch (error) {
        console.error('Gagal menambahkan admin:', error.response ? error.response.data : error.message);
        alert(error.response?.data?.message || 'Gagal menambahkan admin. Coba lagi nanti.');
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="flex h-screen bg-gray-100">
        <sidebar />
        <div class="flex-1 p-10 bg-white rounded-lg shadow-lg overflow-auto w-[1020px] mx-auto">
            <h1 class="text-3xl font-bold text-center text-gray-700 mb-10">Tambah Admin</h1>
            <form @submit.prevent="submitData" class="space-y-8 w-full">
                <div class="grid grid-cols-1 gap-6">
                    <div>
                        <label for="nama" class="block text-lg font-semibold text-gray-600 mb-2">Nama:</label>
                        <input 
                            type="text" 
                            v-model="formData.nama" 
                            id="nama" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg" 
                            placeholder="Masukkan Nama Admin" 
                            required 
                        />
                    </div>
                    <div>
                        <label for="password" class="block text-lg font-semibold text-gray-600 mb-2">Password:</label>
                        <div class="relative">
                            <input 
                                :type="showPassword ? 'text' : 'password'" 
                                v-model="formData.password" 
                                id="password" 
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg" 
                                placeholder="Masukkan Password Admin" 
                                required 
                            />
                            <button 
                                type="button" 
                                @click="togglePasswordVisibility" 
                                class="absolute inset-y-1 right-3 flex items-center m-4"
                            >
                                <svg 
                                    v-if="showPassword" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    class="w-6 h-6"
                                >
                                    <path 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" 
                                        stroke-width="2" 
                                        d="M13.875 18.825a10.05 10.05 0 01-3.75.675c-5.385 0-9.75-4.365-9.75-9.75S4.365 0 9.75 0s9.75 4.365 9.75 9.75c0 1.38-.312 2.687-.825 3.825M15 19.5l3.6 3.6" 
                                    />
                                </svg>
                                <svg 
                                    v-else 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    class="w-6 h-6"
                                >
                                    <path 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" 
                                        stroke-width="2" 
                                        d="M4.5 9.75L7.5 12M1.5 1.5L22.5 22.5" 
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button 
                        type="submit" 
                        :disabled="loading" 
                        class="px-8 py-4 text-lg text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {{ loading ? 'Memproses...' : 'Tambah Admin' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
