<template>
    <div>
        <h2>Liste des demandes</h2>

        <table border="1">
            <thead>
                <tr>
                    <th>Référence</th>
                    <th>Type</th>
                    <th>Catégorie</th>
                    <th>Statut</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="d in demandes" :key="d.id">
                    <td>{{ d.reference }}</td>
                    <td>{{ d.typeDemande }}</td>
                    <td>{{ d.categorieDemande }}</td>
                    <td>{{ d.statutActuel }}</td>
                    <td>
                        <button @click="voirDemande(d.reference)">
                            👁 Voir
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const demandes = ref([])

onMounted(async () => {
    try {
        const numeroPasseport = route.params.numeroPasseport

        const res = await fetch(
            `http://10.112.125.216:8080/backoffice/api/demandes?numeroPasseport=${numeroPasseport}`
        )

        if (!res.ok) throw new Error("Erreur API")

        demandes.value = await res.json()
        
    } catch (error) {
        console.error("Erreur fetch:", e)
    }

})

const voirDemande = (refDemande) => {
    router.push(`/demande/${refDemande}`)
}
</script>