<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main style="width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center;">
    <div>
      <RouterView />
      <div style="margin-top: 10px; text-align: center;">
        <button style="padding: 5px 10px; border-radius: 5px; font-size: large;" @click="router.back()">
          Назад
        </button>
      </div>
    </div>
  </main>
</template>
