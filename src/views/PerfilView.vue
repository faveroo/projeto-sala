<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const userEmail = computed(() => authStore.user?.email || 'Deslogado')

// Função para deslogar e redirecionar
const handleLogout = async () => {
  try {
    await authStore.logout() // Chama o logout na sua store
    router.push('/login')    // Redireciona para a tela de login
  } catch (error) {
    console.error("Erro ao sair:", error)
  }
}
</script>

<template>
  <section class="card">
    <h1><i class="fa-regular fa-circle-user"></i> Meu Perfil</h1>
    <p class="muted">Visualize e gerencie as informações do seu perfil.</p>

    <div class="user-info" v-if="authStore.user">
      <div class="info-row">
        <strong>Email do usuário:</strong> 
        <span>{{ userEmail }}</span>
      </div>

      <button class="logout-btn" @click="handleLogout">
        <i class="fa-solid fa-right-from-bracket"></i> Sair da conta
      </button>
    </div>
    <div v-else>
      <p class="muted">Você não está logado.</p>
    </div>
  </section>
</template>

<style scoped>
.user-info {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #edf2f7;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.info-row strong {
  color: #4a5568;
}

.logout-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #fff5f5;
  color: #e53e3e;
  border: 1px solid #feb2b2;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background-color: #e53e3e;
  color: white;
  border-color: #e53e3e;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(229, 62, 62, 0.2);
}

.logout-btn:active {
  transform: translateY(0);
}
</style>
