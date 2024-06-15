<template>
  <div>ログインしました</div>
  <button @click="signOut()" type="submit">ログアウト</button>
  {{ status }}
  {{ data }}
</template>

<script lang="ts" setup>
const { status, data,  signOut } = useAuth();
</script>