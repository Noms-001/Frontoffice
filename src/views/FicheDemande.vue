<template>
    <div class="container py-4" v-if="demande">

        <!-- HEADER -->

        <div class="page-header mb-4">

            <div class="d-flex justify-content-between align-items-start flex-wrap gap-3">

                <div>

                    <h2 class="fw-bold mb-2">
                        Fiche de demande
                    </h2>

                    <p class="text-muted mb-0">
                        Référence :
                        <strong>{{ demande.reference }}</strong>
                    </p>

                </div>

                <div class="badge bg-primary fs-6 px-3 py-2">
                    {{ demande.statutActuel }}
                </div>

            </div>

        </div>

        <!-- INFOS -->

        <div class="row g-4">

            <!-- LEFT -->

            <div class="col-lg-8">

                <div class="card shadow-sm border-0 h-100">

                    <div class="card-body p-4">

                        <h5 class="fw-bold mb-4">
                            Informations générales
                        </h5>

                        <div class="row g-4">

                            <InfoItem label="Type de demande" :value="demande.typeDemande" />

                            <InfoItem label="Catégorie" :value="demande.categorieDemande" />

                            <InfoItem label="Date demande" :value="demande.dateDemande" />

                            <InfoItem label="Nom" :value="`${demande.demandeur.nom} ${demande.demandeur.prenom}`" />

                            <InfoItem label="Passeport" :value="demande.passeport?.reference" />

                            <InfoItem label="Visa transformable" :value="demande.visaTransformable?.reference" />

                        </div>

                    </div>

                </div>

            </div>

            <!-- RIGHT -->

            <div class="col-lg-4">

                <div class="card shadow-sm border-0">

                    <div class="card-body text-center p-4">

                        <div class="avatar-circle mx-auto mb-3">

                            {{ demande.demandeur.nom.charAt(0) }}

                        </div>

                        <h5 class="fw-bold mb-1">

                            {{ demande.demandeur.nom }}
                            {{ demande.demandeur.prenom }}

                        </h5>

                        <div class="text-muted mb-3">

                            {{ demande.typeDemande }}

                        </div>

                        <div class="status-badge">

                            {{ demande.statutActuel }}

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <!-- VISA -->

        <div class="row g-4 mt-1">

            <div class="col-md-6">

                <div class="card shadow-sm border-0 h-100">

                    <div class="card-body">

                        <h5 class="fw-bold mb-3">
                            Visa Long Séjour
                        </h5>

                        <template v-if="demande.visa">

                            <p>
                                <strong>Référence :</strong>
                                {{ demande.visa.reference }}
                            </p>

                            <p>
                                <strong>Date début :</strong>
                                {{ demande.visa.dateDebut }}
                            </p>

                            <p class="mb-0">
                                <strong>Date fin :</strong>
                                {{ demande.visa.dateFin }}
                            </p>

                        </template>

                        <p v-else class="text-muted mb-0">
                            Aucun visa disponible
                        </p>

                    </div>

                </div>

            </div>

            <div class="col-md-6">

                <div class="card shadow-sm border-0 h-100">

                    <div class="card-body">

                        <h5 class="fw-bold mb-3">
                            Carte de résident
                        </h5>

                        <template v-if="demande.carteResident">

                            <p>
                                <strong>Référence :</strong>
                                {{ demande.carteResident.reference }}
                            </p>

                            <p>
                                <strong>Date début :</strong>
                                {{ demande.carteResident.dateDebut }}
                            </p>

                            <p class="mb-0">
                                <strong>Date fin :</strong>
                                {{ demande.carteResident.dateFin }}
                            </p>

                        </template>

                        <p v-else class="text-muted mb-0">
                            Aucune carte résident
                        </p>

                    </div>

                </div>

            </div>

        </div>

        <!-- DOCUMENTS -->

        <div class="card shadow-sm border-0 mt-4">

            <div class="card-body">

                <div class="d-flex justify-content-between align-items-center mb-4">

                    <h5 class="fw-bold mb-0">
                        Documents
                    </h5>

                    <span class="badge bg-light text-dark">

                        {{ demande.documents.length }}
                        fichier(s)

                    </span>

                </div>

                <div class="row g-4">

                    <div class="col-md-6 col-xl-4" v-for="doc in demande.documents" :key="doc.chemin">

                        <div class="card h-100 border-0 shadow-sm document-card">

                            <div class="card-body">

                                <!-- IMAGE -->

                                <template v-if="isImage(doc.chemin)">

                                    <img :src="fileUrl(doc.chemin)" class="img-fluid rounded preview-image mb-3" />

                                </template>

                                <!-- PDF -->

                                <template v-else-if="isPdf(doc.chemin)">

                                    <div class="file-preview bg-danger-subtle">

                                        <i class="bi bi-file-earmark-pdf text-danger"></i>

                                    </div>

                                </template>

                                <!-- OTHER -->

                                <template v-else>

                                    <div class="file-preview bg-light">

                                        <i class="bi bi-file-earmark"></i>

                                    </div>

                                </template>

                                <div class="fw-semibold text-truncate mb-1">
                                    {{ doc.libelle }}
                                </div>

                                <div class="small text-muted text-truncate mb-3">
                                    {{ doc.chemin }}
                                </div>

                                <a :href="fileUrl(doc.chemin)" target="_blank" class="btn btn-primary w-100">
                                    <i class="bi bi-eye"></i>
                                    Aperçu
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        <!-- HISTORIQUE -->

        <div class="card shadow-sm border-0 mt-4">

            <div class="card-body">

                <h5 class="fw-bold mb-4">
                    Historique
                </h5>

                <div v-for="historique in demande.historiques" :key="historique.dateChangement" class="timeline-item">

                    <div class="fw-semibold">
                        {{ historique.statut }}
                    </div>

                    <div class="small text-muted">
                        {{ historique.dateChangement }}
                    </div>

                </div>

            </div>

        </div>

    </div>

    <div v-else class="text-center py-5">

        <div class="spinner-border"></div>

    </div>
</template>

<script setup>
import { onMounted, ref, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const demande = ref(null)

const API_BASE =
    'http://10.112.125.216:8080/backoffice'

const fileUrl = (chemin) =>
    `${API_BASE}/uploads/${chemin}`

const isImage = (chemin) => {
    return /\.(png|jpg|jpeg|webp)$/i.test(chemin)
}

const isPdf = (chemin) => {
    return /\.pdf$/i.test(chemin)
}

const InfoItem = defineComponent({
    props: ['label', 'value'],
    template: `
        <div class="col-md-6">
            <div class="info-item">
                <div class="info-label">
                    {{ label }}
                </div>
                <div class="info-value">
                    {{ value || '—' }}
                </div>
            </div>
        </div>
    `
})

onMounted(async () => {

    try {

        const numeroDemande =
            route.params.numeroDemande

        const res = await fetch(
            `${API_BASE}/api/demande?numeroDemande=${numeroDemande}`
        )

        if (!res.ok) {
            throw new Error("Erreur API")
        }

        demande.value =
            await res.json()

    } catch (e) {

        console.error(
            "Erreur fetch:",
            e
        )
    }
})
</script>

<style scoped>
.page-header {
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .05);
}

.avatar-circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #0d6efd;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: bold;
}

.status-badge {
    background: #198754;
    color: white;
    padding: 8px 18px;
    border-radius: 30px;
    display: inline-block;
    font-weight: 600;
}

.info-item {
    background: #f8f9fa;
    border-radius: 14px;
    padding: 16px;
    height: 100%;
}

.info-label {
    font-size: 13px;
    color: #6c757d;
    margin-bottom: 6px;
}

.info-value {
    font-weight: 600;
}

.document-card {
    transition: .2s ease;
}

.document-card:hover {
    transform: translateY(-4px);
}

.preview-image {
    height: 220px;
    width: 100%;
    object-fit: cover;
}

.file-preview {
    height: 220px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
}

.file-preview i {
    font-size: 80px;
}

.timeline-item {
    border-left: 4px solid #0d6efd;
    padding-left: 16px;
    margin-bottom: 20px;
}

@media (max-width: 768px) {

    .container {
        padding-left: 12px;
        padding-right: 12px;
    }

    .page-header {
        padding: 18px;
        border-radius: 16px;
    }

    .page-header h2 {
        font-size: 1.4rem;
    }

    .avatar-circle {
        width: 72px;
        height: 72px;
        font-size: 24px;
    }

    .card-body {
        padding: 1rem !important;
    }

    .preview-image,
    .file-preview {
        height: 170px;
    }

    .file-preview i {
        font-size: 56px;
    }

    .timeline-item {
        padding-left: 12px;
        margin-bottom: 16px;
    }

    .status-badge {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }

    .info-item {
        padding: 12px;
        border-radius: 12px;
    }

    .info-label {
        font-size: 12px;
    }

    .info-value {
        font-size: 14px;
        word-break: break-word;
    }

    .document-card .btn {
        font-size: 14px;
        padding: 10px;
    }

    .card h5,
    .fw-bold {
        font-size: 1rem;
    }

    .text-truncate {
        max-width: 100%;
    }
}

@media (max-width: 576px) {

    .page-header {
        padding: 14px;
    }

    .page-header .d-flex {
        flex-direction: column;
        align-items: stretch !important;
    }

    .status-badge {
        font-size: 13px;
    }

    .preview-image,
    .file-preview {
        height: 150px;
    }

    .file-preview i {
        font-size: 48px;
    }

    .avatar-circle {
        width: 64px;
        height: 64px;
        font-size: 22px;
    }

    .info-item {
        min-height: auto;
    }

    .document-card {
        border-radius: 16px;
        overflow: hidden;
    }
}
</style>