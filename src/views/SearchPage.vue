<template>
    <div>
        <h2>Recherche</h2>

        <!-- Recherche par demande -->
        <form @submit.prevent="goToDemande">
            <input v-model="numeroDemande" placeholder="Numéro de demande" />
            <button type="submit">Voir Demande</button>
        </form>

        <br />

        <!-- Recherche par passeport -->
        <form @submit.prevent="goToPasseport">
            <input v-model="numeroPasseport" placeholder="Numéro de passeport" />
            <button type="submit">Voir Demandes</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const numeroDemande = ref('')
const numeroPasseport = ref('')
const router = useRouter()

const goToDemande = () => {
    if (numeroDemande.value) {
        router.push(`/demande/${numeroDemande.value}`)
    }
}

const goToPasseport = () => {
    if (numeroPasseport.value) {
        router.push(`/passeport/${numeroPasseport.value}`)
    }
}
</script>