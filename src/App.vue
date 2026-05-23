<template>
  <div>
    <h1>Gestion des demandes</h1>

    <!-- Navigation simple (optionnel) -->
    <nav>
      <router-link to="/">Accueil</router-link>
    </nav>

    <hr />

    <!-- Ici les pages vont s'afficher -->
    <router-view />
  </div>
</template>

<script setup>
// rien à mettre ici pour le moment
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
nav a {
  margin-right: 10px;
}
</style>