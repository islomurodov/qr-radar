<script setup lang="ts">
import type { AxiosError } from 'axios'
import { toast } from 'vue3-toastify'
import instance from '~/composables/axios'
import 'vue3-toastify/dist/index.css'

const router = useRouter()

const credentials = reactive<{ login: string, name: string, typeRegistration: 'email' | 'phone', password: string, confirmPassword: string }>({
  login: '',
  name: '',
  typeRegistration: 'email',
  password: '',
  confirmPassword: '',
})

async function registerUser() {
  if (credentials.login && credentials.name && credentials.password && credentials.confirmPassword) {
    if (credentials.password === credentials.confirmPassword) {
      await instance.post('/auth/register', {
        login: credentials.login,
        password: credentials.password,
        name: credentials.name,
      }).catch((error: AxiosError) => {
        toast.error(error.response?.data)
      })

      toast.success('Helloo')

      router.push('/vhod')
    }
    else {
      toast.error('Пароли не совпали')
    }
  }
  else {
    toast.error('Пожалуйста, заполните все пустые поля')
  }
}
</script>

<template>
  <section class="register">
    <img src="/img/bg-register.png" alt="" class="bg-register">
    <div class="container">
      <div class="register-content">
        <form @submit.prevent>
          <div class="register-content-top">
            <span>Регистрация</span>
            <p>Также как начало повседневной работы по формированию</p>
          </div>
          <input type="text" required placeholder="Ваше имя" v-model="credentials.name">
          <div class="register-type">
            <p>Выберите тип регистрации</p>
            <div class="register-type-container">
              <div :class="credentials.typeRegistration === 'email' ? 'register-type-container-block-active' : ''"
                class="register-type-container-block" @click="credentials.typeRegistration = 'email'">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path
                    d="M12.75 22.5C18.25 22.5 22.75 18 22.75 12.5C22.75 7 18.25 2.5 12.75 2.5C7.25 2.5 2.75 7 2.75 12.5C2.75 18 7.25 22.5 12.75 22.5Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.5 12.5L11.33 15.33L17 9.67004" stroke="white" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                Почта
              </div>
              <div :class="credentials.typeRegistration === 'phone' ? 'register-type-container-block-active' : ''"
                class="register-type-container-block" @click="credentials.typeRegistration = 'phone'">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <path
                    d="M12.75 22.5C18.25 22.5 22.75 18 22.75 12.5C22.75 7 18.25 2.5 12.75 2.5C7.25 2.5 2.75 7 2.75 12.5C2.75 18 7.25 22.5 12.75 22.5Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M8.5 12.5L11.33 15.33L17 9.67004" stroke="white" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                Номер телефона
              </div>
            </div>
          </div>
          <input required v-model="credentials.login" :type="credentials.typeRegistration === 'email' ? 'email' : 'tel'" :placeholder="credentials.typeRegistration === 'email' ? 'Ваша почта' : 'Ваш номер телефона'">
          <input required type="password" placeholder="Пароль" v-model="credentials.password">
          <input required type="password" placeholder="Подтвердите пароль" v-model="credentials.confirmPassword">
          <button class="btn-register" type="submit" @click="() => registerUser()">
            Регистрация
          </button>
          <RouterLink to="/register">
            <button class="btn-register" type="button" style="background: #90a3bf">
              У меня уже есть аккаунт
            </button>
          </RouterLink>
        </form>
        <!-- <div class="register-bottom">
          <div class="register-bottom-block register-bottom-block-face">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clip-path="url(#clip0_103_829)">
                <rect
                  width="24"
                  height="24"
                  transform="translate(0.25 0.5)"
                  fill="#1877F2"
                />
                <path
                  d="M23.75 12.5699C23.75 6.2186 18.6013 1.06988 12.25 1.06988C5.89872 1.06988 0.75 6.2186 0.75 12.5699C0.75 18.3099 4.95538 23.0674 10.4531 23.9302V15.8941H7.5332V12.5699H10.4531V10.0363C10.4531 7.1541 12.17 5.56207 14.7968 5.56207C16.055 5.56207 17.3711 5.78668 17.3711 5.78668V8.61675H15.921C14.4924 8.61675 14.0469 9.50322 14.0469 10.4127V12.5699H17.2363L16.7265 15.8941H14.0469V23.9302C19.5446 23.0674 23.75 18.3099 23.75 12.5699Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_103_829">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.25 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            Войти с помощью Facebook
          </div>
          <div class="register-bottom-block register-bottom-block-sber">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M18.8319 4.17139C19.317 4.80706 19.7277 5.49766 20.0557 6.22932L10.7527 13.1793L6.86475 10.7093V7.73782L10.7527 10.2078L18.8319 4.17139Z"
                fill="#21A038"
              />
              <path
                d="M2.89653 10.4996C2.89653 10.3663 2.89974 10.2338 2.90616 10.1021L0.549942 9.98511C0.541922 10.1558 0.537112 10.3281 0.537112 10.502C0.53611 11.8609 0.799838 13.2065 1.31318 14.4617C1.82651 15.717 2.57934 16.8572 3.52849 17.817L5.19981 16.124C4.46919 15.3865 3.88959 14.51 3.49431 13.5447C3.09904 12.5795 2.89589 11.5446 2.89653 10.4996Z"
                fill="url(#paint0_linear_338_915)"
              />
              <path
                d="M10.7502 2.54068C10.8817 2.54068 11.0124 2.54556 11.1423 2.55205L11.2602 0.163322C11.0913 0.155194 10.9212 0.151131 10.7502 0.151131C9.40872 0.149473 8.08025 0.416365 6.84092 0.936481C5.60159 1.4566 4.47584 2.2197 3.52832 3.18196L5.19964 4.87577C5.92734 4.13507 6.79234 3.54746 7.7449 3.14672C8.69746 2.74598 9.71875 2.54002 10.7502 2.54068Z"
                fill="url(#paint1_linear_338_915)"
              />
              <path
                d="M10.7501 18.4593C10.6186 18.4593 10.4878 18.4593 10.3572 18.4487L10.2393 20.8366C10.4087 20.8453 10.579 20.8496 10.7501 20.8496C12.091 20.851 13.4188 20.584 14.6575 20.0637C15.8961 19.5434 17.0212 18.7802 17.968 17.818L16.2998 16.125C15.572 16.8653 14.7071 17.4526 13.7547 17.8532C12.8023 18.2538 11.7813 18.4598 10.7501 18.4593Z"
                fill="url(#paint2_linear_338_915)"
              />
              <path
                d="M15.1777 3.9293L17.1634 2.446C15.3485 0.95656 13.083 0.145768 10.7476 0.149918V2.54028C12.329 2.53829 13.8737 3.02263 15.1777 3.9293Z"
                fill="url(#paint3_linear_338_915)"
              />
              <path
                d="M20.9627 10.4998C20.9639 9.87793 20.9103 9.25717 20.8022 8.64502L18.604 10.2868C18.604 10.3576 18.604 10.4283 18.604 10.4998C18.6046 11.6119 18.3746 12.7117 17.9289 13.7279C17.4832 14.7441 16.8318 15.6541 16.0168 16.3988L17.6024 18.1748C18.6618 17.2055 19.5084 16.0213 20.0873 14.6992C20.6662 13.377 20.9644 11.9463 20.9627 10.4998Z"
                fill="#21A038"
              />
              <path
                d="M10.7508 18.4599C9.65341 18.4603 8.56814 18.2271 7.56527 17.7754C6.56245 17.3238 5.66438 16.6636 4.92925 15.8379L3.17773 17.4439C4.13406 18.5178 5.30242 19.3759 6.60706 19.9628C7.91169 20.5496 9.32344 20.8519 10.7508 20.8502V18.4599Z"
                fill="url(#paint4_linear_338_915)"
              />
              <path
                d="M5.48372 4.60049L3.89901 2.82458C2.83925 3.79371 1.99233 4.97777 1.41316 6.29996C0.833998 7.62214 0.53553 9.05294 0.537116 10.4996H2.89654C2.89605 9.38753 3.12611 8.28771 3.57179 7.27148C4.01748 6.25529 4.66886 5.34529 5.48372 4.60049Z"
                fill="url(#paint5_linear_338_915)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_338_915"
                  x1="4.00567"
                  y1="17.5187"
                  x2="1.36591"
                  y2="9.98903"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.14" stop-color="#F1E813" />
                  <stop offset="0.3" stop-color="#E6E418" />
                  <stop offset="0.58" stop-color="#C9DA26" />
                  <stop offset="0.89" stop-color="#A2CC39" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_338_915"
                  x1="4.20198"
                  y1="3.6046"
                  x2="10.8638"
                  y2="1.09957"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.06" stop-color="#0FA7DF" />
                  <stop offset="0.54" stop-color="#0098F8" />
                  <stop offset="0.92" stop-color="#0290EA" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_338_915"
                  x1="10.0837"
                  y1="19.4069"
                  x2="17.6014"
                  y2="17.7312"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.12" stop-color="#A2CC39" />
                  <stop offset="0.28" stop-color="#86C239" />
                  <stop offset="0.87" stop-color="#219F38" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_338_915"
                  x1="10.2568"
                  y1="0.950497"
                  x2="16.6906"
                  y2="2.90957"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.06" stop-color="#0290EA" />
                  <stop offset="0.79" stop-color="#0C89CA" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_338_915"
                  x1="3.76959"
                  y1="17.1529"
                  x2="10.7791"
                  y2="19.7379"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.13" stop-color="#F1E813" />
                  <stop offset="0.3" stop-color="#EAE616" />
                  <stop offset="0.53" stop-color="#D8DF1F" />
                  <stop offset="0.8" stop-color="#BAD52D" />
                  <stop offset="0.98" stop-color="#A2CC39" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_338_915"
                  x1="1.41608"
                  y1="10.7889"
                  x2="4.28658"
                  y2="3.42086"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.07" stop-color="#A2CC39" />
                  <stop offset="0.26" stop-color="#81C45E" />
                  <stop offset="0.92" stop-color="#0FA7DF" />
                </linearGradient>
              </defs>
            </svg>
            Войти с помощью Сбербанк
          </div>
        </div>
        <div
          class="register-bottom-block register-bottom-block-google"
          style="width: 100%; margin-top: 10px"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.29 12.7613C23.29 11.9459 23.2168 11.1618 23.0809 10.4091H12.25V14.8575H18.4391C18.1725 16.295 17.3623 17.5129 16.1443 18.3284V21.2138H19.8609C22.0355 19.2118 23.29 16.2636 23.29 12.7613Z"
              fill="#4285F4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.25 23.9998C15.355 23.9998 17.9581 22.97 19.8609 21.2137L16.1443 18.3282C15.1145 19.0182 13.7972 19.4259 12.25 19.4259C9.25474 19.4259 6.71951 17.403 5.81519 14.6848H1.97314V17.6644C3.86542 21.4228 7.75451 23.9998 12.25 23.9998Z"
              fill="#34A853"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.81523 14.6851C5.58523 13.9951 5.45455 13.2581 5.45455 12.5001C5.45455 11.7422 5.58523 11.0051 5.81523 10.3151V7.33557H1.97318C1.19432 8.88807 0.75 10.6444 0.75 12.5001C0.75 14.3558 1.19432 16.1122 1.97318 17.6647L5.81523 14.6851Z"
              fill="#FBBC05"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.25 5.57386C13.9384 5.57386 15.4543 6.15409 16.6461 7.29364L19.9445 3.99523C17.9529 2.13955 15.3497 1 12.25 1C7.75451 1 3.86542 3.57705 1.97314 7.33545L5.81519 10.315C6.71951 7.59682 9.25474 5.57386 12.25 5.57386Z"
              fill="#EA4335"
            />
          </svg>
          Войти с помощью Google
        </div> -->
      </div>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
