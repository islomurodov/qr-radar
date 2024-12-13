<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import type { PublicFields } from '~/types/auth'
import instance from '~/composables/axios'

const route = useRoute()
const id = (route.params as { id: string }).id

const data = ref<PublicFields>()

onMounted(async () => {
  const response: AxiosResponse = await instance.get(
    `/qr-code/public-fields/${id}`,
  )

  data.value = response.data
})
</script>

<template>
  <section class="sample-page">
    <img src="/img/bg-register.png" alt="" class="bg-register">
    <div class="container">
      <div class="sample-page-top">
        <div class="sample-page-top-img">
          <img src="/img/image-sample.png" alt="">
        </div>
        <div v-if="data" class="sample-page-top-content">
          <strong v-if="data.lastname || data.firstname || data.surname">{{ data.lastname }} {{ data.firstname }} {{ data.surname }}</strong>
          <a v-if="data.phone" :href="`tel:${data.phone}`">{{ data.phone }}</a>
          <a v-if="data.email" :href="`mailto:${data.email}`">{{ data.email }}</a>
          <a v-if="data.socialMedia" :href="data.socialMedia">{{ data.socialMedia }}</a>
          <p v-if="data.reward">
            Вознаграждение: <span>{{ data.reward }} руб</span>
          </p>
        </div>
      </div>
      <!-- <div class="sample-page-block">
        <p>Обратная связь</p>
        <form action="" class="form-container">
          <input type="text" placeholder="Имя">
          <input type="tel" placeholder="Телефон">
          <textarea>Сообщение</textarea>
          <button type="button" class="btn-send">
            Отправить
          </button>
        </form>
      </div> -->
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
