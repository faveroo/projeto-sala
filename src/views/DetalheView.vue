<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth' // Importe isso
import { auth, db } from '../firebase/config'

const despesas = ref([])
let unsubscribe = null // Declarado corretamente aqui

const ouvirDespesas = (user) => {
    const q = query(
        collection(db, 'financas'),
        where('userId', '==', user.uid)
    )

    unsubscribe = onSnapshot(q, (snapshot) => {
        despesas.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    }, (error) => {
        console.error("Erro ao buscar dados:", error)
    })
}

onMounted(() => {
    // Em vez de checar apenas uma vez, ouvimos a mudança de estado
    // Isso resolve o problema de carregar a página e vir nulo
    onAuthStateChanged(auth, (user) => {
        if (user) {
            ouvirDespesas(user)
        } else {
            console.log("Usuário não está logado")
        }
    })
})

onBeforeUnmount(() => {
    if (unsubscribe) unsubscribe()
})
</script>

<template>
    <section class="card">
        <h1><i class="fa-solid fa-receipt"></i> Relatório de Gastos</h1>
        <p class="muted">Detalhes dos seus gastos cadastrados.</p>

        <div v-if="despesas.length" class="grid-layout">
            <div v-for="item in despesas" :key="item.id" class="expense-card">
                <div class="card-header">
                    <span class="category-badge">Despesa</span>
                    <i class="fa-solid fa-receipt icon-muted"></i>
                </div>

                <div class="card-body">
                    <h3 class="card-title">{{ item.descricao }}</h3>
                    <p class="card-value">R$ {{ Number(item.valor).toFixed(2) }}</p>
                </div>

                <div class="card-footer">
                    <span class="date-info">Sincronizado com Firestore</span>
                </div>
            </div>
        </div>

        <div v-else class="empty-state">
            <i class="fa-solid fa-folder-open"></i>
            <p>Ainda não há despesas cadastradas.</p>
        </div>
    </section>
</template>

<style scoped>

/* Grid Responsivo */
.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

/* O Card */
.expense-card {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #edf2f7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.expense-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Cabeçalho do Card */
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.category-badge {
    background: #e6fffa;
    color: #319795;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 4px 10px;
    border-radius: 20px;
    text-transform: uppercase;
}

.icon-muted {
    color: #a0aec0;
}

/* Corpo do Card */
.card-body {
    margin-bottom: 15px;
}

.card-title {
    margin: 0;
    font-size: 1.1rem;
    color: #4a5568;
    font-weight: 600;
    text-transform: capitalize;
}

.card-value {
    margin: 5px 0 0 0;
    font-size: 1.5rem;
    font-weight: 800;
    color: #27ae60;
    /* VERDE DESTAQUE */
}

/* Rodapé do Card */
.card-footer {
    border-top: 1px solid #edf2f7;
    padding-top: 10px;
}

.date-info {
    font-size: 0.75rem;
    color: #a0aec0;
}

/* Estado Vazio */
.empty-state {
    text-align: center;
    padding: 50px;
    color: #a0aec0;
}

.empty-state i {
    font-size: 3rem;
    margin-bottom: 10px;
}
</style>