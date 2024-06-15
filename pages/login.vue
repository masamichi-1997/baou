<template>
  <h1>ログイン</h1>
  <button @click="signIn('github')" type="submit">Githubでログイン</button>
  <button @click="signIn('google')" type="submit">Googleでログイン</button>
  <button @click="signOut()" type="submit">ログアウト</button>
  <p>Status: {{ status }}</p>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/home", // 認証済みのリダイレクト先
  },
});
const { status, data, signIn, signOut } = useAuth();
</script>
