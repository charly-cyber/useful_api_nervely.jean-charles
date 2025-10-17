<template>

    <div class="container mx-auto p-7 border-2 rounded-xl">
        <h2 class="text-2xl font-bold mb-6">Register</h2>
        <form @submit.prevent="handleRegister">
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium">Name</label>
                <input type="text" id="name" class="w-full px-3 py-2 border rounded-md" placeholder="Votre nom"
                    v-model="formData.name" required>
                <p v-if="authStore.authErrors.name" class="error-message">{{ authStore.authErrors.name[0] }}</p>
            </div>

            <div class="mb-4">
                <label for="email" class="block text-sm font-medium">Email</label>
                <input type="email" id="email" class="w-full px-3 py-2 border rounded-md"
                    placeholder="Votre adresse email" v-model="formData.email" required>
                <p v-if="authStore.authErrors.email" class="error-message">{{ authStore.authErrors.email[0] }}</p>
            </div>

            <div class="mb-4">
                <label for="password" class="block text-sm font-medium">password</label>
                <input type="password" id="password" class="w-full px-3 py-2 border rounded-md"
                    placeholder="Votre mot de passe" v-model="formData.password" required>
                <p v-if="authStore.authErrors.password" class="error-message">{{ authStore.authErrors.password[0] }}</p>
            </div>
            <div class="mb-4">
                <label for="confirm_password" class="block text-sm font-medium">confirm password</label>
                <input type="password" id="password_confirmation" class="w-full px-3 py-2 border rounded-md"
                    placeholder="Votre mot de passe" v-model="formData.password_confirmation" required>
                <p v-if="authStore.authErrors.password_confirmation" class="error-message">{{
                    authStore.authErrors.password_confirmation[0] }}</p>
            </div>

            <button type="submit" :disabled="authStore.isLoading"
                class="w-full bg-blue-500 text-white py-2 px-4 cursor-pointer rounded-md hover:bg-blue-600"> {{
                    authStore.isLoading ? 'Enregistrement...' : 'S\'inscrire' }}</button>
        </form>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="authStore.authErrors.generic" class="error-message">{{ authStore.authErrors.generic }}</p>
    </div>

</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

const successMessage = ref('');

const handleRegister = async () => {
    try {
        await authStore.register(formData);
        successMessage.value = 'registration succesfully !';
        authStore.authErrors = {};
    } catch (error) {
        successMessage.value = '';

    }
};
</script>
