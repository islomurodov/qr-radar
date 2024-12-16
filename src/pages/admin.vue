<script setup lang="ts">
import type { QRCode, QRCodeUpdate } from '~/types/auth'
import instance from '~/composables/axios'

const userStore = useUserStore()
const selectedQRCode = ref<number | null>(null)
const qrCodes = ref<QRCode[]>([])

async function submitChanges(changes: QRCodeUpdate) {
  if (qrCodes.value && selectedQRCode.value !== null) {
    await instance.put('/qr-code/update', {
      qrCodeId: qrCodes.value[selectedQRCode.value]._id,
      data: {
        lastname: {
          isPublic: changes.data?.lastname?.isPublic,
          value: changes.data?.lastname?.value,
        },
        firstname: {
          isPublic: changes.data?.firstname?.isPublic,
          value: changes.data?.firstname?.value,
        },
        surname: {
          isPublic: changes.data?.surname?.isPublic,
          value: changes.data?.surname?.value,
        },
        phone: {
          isPublic: changes.data?.phone?.isPublic,
          value: changes.data?.phone?.value,
        },
        email: {
          isPublic: changes.data?.email?.isPublic,
          value: changes.data?.email?.value,
        },
        socialMedia: {
          isPublic: changes.data?.socialMedia?.isPublic,
          value: changes.data?.socialMedia?.value,
        },
        reward: {
          isPublic: changes.data?.reward?.isPublic,
          value: changes.data?.reward?.value,
        },
        text: {
          isPublic: changes.data?.text?.isPublic,
          value: changes.data?.text?.value,
        },
        feedbackType: changes.data?.feedbackType,
      },
    }, {
      headers: {
        Authorization: `Baerer ${userStore.token}`,
      },
    })
  }
}

onMounted(async () => {
  const user = await userStore.getMe()

  const fetchPromises = user.qrCodes.map((qrCodeId, index) => {
    return userStore.getQRCode(qrCodeId).then((response: QRCode) => {
      if (response) {
        qrCodes.value[index] = response
      }
    })
  })

  await Promise.all(fetchPromises)
})
</script>

<template>
  <section class="register" style="min-height: 100vh;">
    <img src="/img/admin.png" alt="" class="bg-register">
    <div class="container">
      <div class="register-content admin-content">
        <div class="register-content-top">
          <span>Добро пожаловать!</span>
          <p>
            Заполните все необходимые поля для отображения на странице связи
          </p>
        </div>
        <div class="qr-container">
          <div class="qr-container-top">
            Выберите qr-код
          </div>
          <div v-if="qrCodes.length > 0" class="qr-container-content">
            <div
              v-for="(qrCode, index) in qrCodes"
              :key="qrCode._id"
              class="qr-container-content-block"
              :style="[
                selectedQRCode === index ? 'background-color: gainsboro;' : '',
              ]"
              @click="
                selectedQRCode === index
                  ? (selectedQRCode = null)
                  : (selectedQRCode = index)
              "
            >
              <img :src="qrCode.qrCode || '/img/placeholder.png'" alt="">
              <p>{{ qrCode.name }}</p>
            </div>
          </div>
          <div v-else style="font-size: large; text-align: center; margin-top: 20px; color: rgba(0, 0, 0, 0.7);">
            К сожалению, у вас нет никаких QR-кодов.😔
          </div>
        </div>
        <!-- <div class="qr-container">
          <div class="qr-container-top">
            Выберите шаблон
          </div>
          <div class="qr-container-content">
            <div class="qr-container-content-block qr-container-content-block-sample">
              <img src="/img/image-sample2.png" alt="">
              <p>Название шаблона</p>
            </div>
            <div class="qr-container-content-block qr-container-content-block-sample">
              <img src="/img/image-sample2.png" alt="">
              <p>Название шаблона</p>
            </div>
            <div class="qr-container-content-block qr-container-content-block-sample">
              <img src="/img/image-sample2.png" alt="">
              <p>Название шаблона</p>
            </div>
          </div>
        </div> -->
        <div class="admin-container">
          <div v-if="selectedQRCode !== null" class="admin-container-left">
            <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input
                    v-model="qrCodes[selectedQRCode].data.lastname.isPublic"
                    type="checkbox"
                    name="color"
                    value="indigo"
                    :checked="qrCodes[selectedQRCode].data.lastname.isPublic"
                    @input="(event: any) => submitChanges({ data: { lastname: { isPublic: event.target.checked } } })"
                  >
                  <span>Отображать на странице (Фамилия)</span>
                </label>
              </div>
              <input
                v-model="qrCodes[selectedQRCode].data.lastname.value"
                type="text"
                class="admin-block-input"
                placeholder="Фамилия"
                @input="(event: any) => submitChanges({ data: { lastname: { value: event.target.value } } })"
              >
            </div>
            <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input
                    v-model="qrCodes[selectedQRCode].data.firstname.isPublic"
                    type="checkbox"
                    name="color"
                    value="indigo"
                    :checked="qrCodes[selectedQRCode].data.firstname.isPublic"
                    @input="(event: any) => submitChanges({ data: { firstname: { isPublic: event.target.checked } } })"
                  >
                  <span>Отображать на странице (Имя)</span>
                </label>
              </div>
              <input
                v-model="qrCodes[selectedQRCode].data.firstname.value"
                type="text"
                class="admin-block-input"
                placeholder="Имя"
                @input="(event: any) => submitChanges({ data: { firstname: { value: event.target.value } } })"
              >
            </div>
            <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input
                    v-model="qrCodes[selectedQRCode].data.surname.isPublic"
                    type="checkbox"
                    name="color"
                    value="indigo"
                    :checked="qrCodes[selectedQRCode].data.surname.isPublic"
                    @input="(event: any) => submitChanges({ data: { surname: { isPublic: event.target.checked } } })"
                  >
                  <span>Отображать на странице (Отчество)</span>
                </label>
              </div>
              <input
                v-model="qrCodes[selectedQRCode].data.surname.value"
                type="text"
                class="admin-block-input"
                placeholder="Отчество"
                @input="(event: any) => submitChanges({ data: { surname: { value: event.target.value } } })"
              >
            </div>
            <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input
                    v-model="qrCodes[selectedQRCode].data.phone.isPublic"
                    type="checkbox"
                    name="color"
                    value="indigo"
                    :checked="qrCodes[selectedQRCode].data.phone.isPublic"
                    @input="(event: any) => submitChanges({ data: { phone: { isPublic: event.target.checked } } })"
                  >
                  <span>Отображать на странице (Телефон)</span>
                </label>
              </div>
              <input
                v-model="qrCodes[selectedQRCode].data.phone.value"
                type="tel"
                class="admin-block-input"
                placeholder="Телефон"
                @input="(event: any) => submitChanges({ data: { phone: { isPublic: event.target.value } } })"
              >
            </div>
            <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input
                    v-model="qrCodes[selectedQRCode].data.email.isPublic"
                    type="checkbox"
                    name="color"
                    value="indigo"
                    :checked="qrCodes[selectedQRCode].data.email.isPublic"
                    @input="(event: any) => submitChanges({ data: { email: { isPublic: event.target.checked } } })"
                  >
                  <span>Отображать на странице (Почта)</span>
                </label>
              </div>
              <input
                v-model="qrCodes[selectedQRCode].data.email.value"
                type="email"
                class="admin-block-input"
                placeholder="Почта"
                @input="(event: any) => submitChanges({ data: { email: { value: event.target.value } } })"
              >
            </div>
            <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input
                    v-model="qrCodes[selectedQRCode].data.socialMedia.isPublic"
                    type="checkbox"
                    name="color"
                    value="indigo"
                    :checked="qrCodes[selectedQRCode].data.socialMedia.isPublic"
                    @input="(event: any) => submitChanges({ data: { socialMedia: { isPublic: event.target.checked } } })"
                  >
                  <span>Отображать на странице (Соц сеть)</span>
                </label>
              </div>
              <input
                v-model="qrCodes[selectedQRCode].data.socialMedia.value"
                type="text"
                class="admin-block-input"
                placeholder="Страница соц сети"
                @input="(event: any) => submitChanges({ data: { socialMedia: { value: event.target.value } } })"
              >
            </div>
            <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input
                    v-model="qrCodes[selectedQRCode].data.reward.isPublic"
                    type="checkbox"
                    name="color"
                    value="indigo"
                    :checked="qrCodes[selectedQRCode].data.reward.isPublic"
                    @input="(event: any) => submitChanges({ data: { reward: { isPublic: event.target.checked } } })"
                  >
                  <span>Отображать на странице (Вознаграждение)</span>
                </label>
              </div>
              <input
                v-model="qrCodes[selectedQRCode].data.reward.value"
                type="text"
                class="admin-block-input"
                placeholder="Вознаграждение"
                @input="(event: any) => submitChanges({ data: { reward: { value: event.target.value } } })"
              >
            </div>
            <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input
                    v-model="qrCodes[selectedQRCode].data.text.isPublic"
                    type="checkbox"
                    name="color"
                    value="indigo"
                    :checked="qrCodes[selectedQRCode].data.text.isPublic"
                    @input="(event: any) => submitChanges({ data: { text: { isPublic: event.target.checked } } })"
                  >
                  <span>Отображать на странице</span>
                </label>
              </div>
              <textarea v-model="qrCodes[selectedQRCode].data.text.value" @input="(event: any) => submitChanges({ data: { text: { value: event.target.value } } })" />
            </div>
          </div>
          <div v-if="selectedQRCode !== null" class="admin-container-right">
            <div class="register-type">
              <p>Выберите тип обратной связи</p>
              <div class="register-type-container">
                <button class="register-type-container-block" :class="qrCodes[selectedQRCode].data.feedbackType === 'email' ? 'register-type-container-block-active' : ''" @click="() => { selectedQRCode !== null ? qrCodes[selectedQRCode].data.feedbackType = 'email' : ''; return submitChanges({ data: { feedbackType: 'email' } }) }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path
                      d="M12.75 22.5C18.25 22.5 22.75 18 22.75 12.5C22.75 7 18.25 2.5 12.75 2.5C7.25 2.5 2.75 7 2.75 12.5C2.75 18 7.25 22.5 12.75 22.5Z"
                      stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8.5 12.5L11.33 15.33L17 9.67004" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  Почта
                </button>
                <button class="register-type-container-block" :class="qrCodes[selectedQRCode].data.feedbackType === 'phone' ? 'register-type-container-block-active' : ''" @click="() => { selectedQRCode !== null ? qrCodes[selectedQRCode].data.feedbackType = 'phone' : ''; return submitChanges({ data: { feedbackType: 'phone' } }) }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path
                      d="M12.75 22.5C18.25 22.5 22.75 18 22.75 12.5C22.75 7 18.25 2.5 12.75 2.5C7.25 2.5 2.75 7 2.75 12.5C2.75 18 7.25 22.5 12.75 22.5Z"
                      stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8.5 12.5L11.33 15.33L17 9.67004" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  СМС
                </button>
                <button class="register-type-container-block" :class="qrCodes[selectedQRCode].data.feedbackType === 'social' ? 'register-type-container-block-active' : ''" @click="() => { selectedQRCode !== null ? qrCodes[selectedQRCode].data.feedbackType = 'social' : ''; return submitChanges({ data: { feedbackType: 'social' } }) }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path
                      d="M12.75 22.5C18.25 22.5 22.75 18 22.75 12.5C22.75 7 18.25 2.5 12.75 2.5C7.25 2.5 2.75 7 2.75 12.5C2.75 18 7.25 22.5 12.75 22.5Z"
                      stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8.5 12.5L11.33 15.33L17 9.67004" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  Соц. сети
                </button>
              </div>
            </div>
            <!-- <div class="admin-block">
              <div class="radio">
                <label class="custom-radio">
                  <input type="radio" name="color" value="indigo">
                  <span>Отображать на странице (Аватарка)</span>
                </label>
              </div>
              <div class="admin-block-avatar">
                <img src="/img/image.png" alt="" />
              </div>
              <div class="admin-block-safe">
                <p>Ваша безопасность</p>
                <input
                  type="password"
                  class="admin-block-input"
                  placeholder="Пароль"
                />
                <input
                  type="password"
                  class="admin-block-input"
                  placeholder="П��вторите пароль"
                />
                <button type="button" class="btn-send">
                  Сохранить
                </button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
