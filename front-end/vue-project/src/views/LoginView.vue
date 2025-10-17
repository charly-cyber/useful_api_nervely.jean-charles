

<template>

    <div class="container mx-auto p-7 border-2 rounded-xl">
        <h2 class="text-2xl font-bold mb-6">Sign in</h2>
        <form @submit.prevent="handleLogin">

            <div class="mb-4">
                <label for="email" class="block text-sm font-medium">Email</label>
                <input type="email" id="email" class="w-full px-3 py-2 border rounded-md"
                    placeholder="Votre adresse email" v-model="formData.email" required>
            </div>
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium">password</label>
                <input type="password" id="password" class="w-full px-3 py-2 border rounded-md"
                    placeholder="Votre mot de passe" v-model="formData.password" required>
            </div>

            <button type="submit" :disabled="authStore.isLoading"
                class="w-full bg-blue-500 text-white cursor-pointer py-2 px-4 rounded-md hover:bg-blue-600"> {{
                authStore.isLoading ? 'Connexion...' : 'Se connecter' }}</button>
        </form>
        <p v-if="authStore.authError" class="error">{{ authStore.authError }}</p>
        <p v-if="authStore.isAuthenticated" class="success">Connexion réussie !</p>
    </div>

</template>
<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';


const authStore = useAuthStore();

const formData = reactive({
  email: '',
  password: ''
});

const handleLogin = async () => {
  try {
    await authStore.login(formData);
  
    authStore.authError = null;
    console.log('Connexion successfully !');
   
    //router.push('/dashboard');
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
};
</script>