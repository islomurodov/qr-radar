<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div>
    <section class="sec1">
      <img src="/img/bg-sec1.png" alt="" class="bg-sec1">
      <div class="container">
        <div class="sec1-container">
          <h1><span>Найди</span> свою вещь используя QRadar</h1>
          <p>Также как начало повседневной работы по формированию</p>
          <RouterLink to="/vhod">
            <button class="btn-sign-in" type="button">
              Войти
            </button>
          </RouterLink>
        </div>
      </div>
    </section>
    <section class="sec2">
      <img src="/img/sec2-bg2.png" alt="" class="sec2-bg2">
      <div class="container">
        <div class="sec2-block">
          <div class="sec2-block-text">
            Описание <br>
            <span>нашего</span> товара
          </div>
          <ul>
            <li>Your email revenue is 20% or less</li>
            <li>You need ideas to grow your email channel</li>
            <li>You want expert help with implementing strategies</li>
            <li>Your competitors' emails outperform yours</li>
            <li>Email deliverability became a problem</li>
          </ul>
        </div>
      </div>
    </section>
    <section class="sec-logo">
      <div class="container">
        <div class="sec-logo-container">
          <a href="">
            <img src="/img/logo1.png" alt="">
          </a>
          <a href="">
            <img src="/img/logo2.png" alt="">
          </a>
          <a href="">
            <img src="/img/logo3.png" alt="">
          </a>
          <a href="">
            <img src="/img/logo4.png" alt="">
          </a>
          <a href="">
            <img src="/img/logo5.png" alt="">
          </a>
          <a href="">
            <img src="/img/logo6.png" alt="">
          </a>
        </div>
      </div>
    </section>
    <section class="sec-documents">
      <div class="container">
        <div class="sec-documents-container">
          <div class="sec-documents-text">
            <div class="sec-documents-text-title">
              Документы
            </div>
            <div class="sec-documents-text-container">
              <div class="sec-documents-text-container-block">
                <div class="sec-documents-text-container-block-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <g clip-path="url(#clip0_102_12444)">
                      <path d="M0 0.849854H23V31.762L0 55.8499V0.849854Z" fill="#F5333F" />
                      <path d="M33 0.849854H56V31.762L33 55.8499V0.849854Z" fill="#F5333F" />
                    </g>
                    <defs>
                      <clipPath id="clip0_102_12444">
                        <rect width="56" height="55" fill="white" transform="translate(0 0.949951)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="sec-documents-text-container-block-content">
                  <p>
                    Также как начало повседневной работы по формированию позиции
                    не даёт нам иного выбора, кроме определения экономической
                    целесообразности
                  </p>
                  <span> Название документа </span>
                  <a href=""> Скачать </a>
                </div>
              </div>
              <div class="sec-documents-text-container-block">
                <div class="sec-documents-text-container-block-img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                    <g clip-path="url(#clip0_102_12444)">
                      <path d="M0 0.849854H23V31.762L0 55.8499V0.849854Z" fill="#F5333F" />
                      <path d="M33 0.849854H56V31.762L33 55.8499V0.849854Z" fill="#F5333F" />
                    </g>
                    <defs>
                      <clipPath id="clip0_102_12444">
                        <rect width="56" height="55" fill="white" transform="translate(0 0.949951)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div class="sec-documents-text-container-block-content">
                  <p>
                    Также как начало повседневной работы по формированию позиции
                    не даёт нам иного выбора, кроме определения экономической
                    целесообразности
                  </p>
                  <span> Название документа </span>
                  <a href=""> Скачать </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sec-documents-container-img">
        <img src="/img/doc-img.png" alt="">
      </div>
    </section>
    <section class="sec-rules">
      <div class="container">
        <div class="sec2-block">
          <div class="sec2-block-text">
            Правила <br>
            <span>сайта</span>
          </div>
          <p>
            Для современного мира дальнейшее развитие различных форм
            деятельности в значительной степени обусловливает важность
            дальнейших направлений развития. В рамках спецификации современных
            стандартов, интерактивные прототипы представляют собой не что иное,
            как квинтэссенцию победы маркетинга над разумом и должны быть
            ограничены исключительно образом мышления.
            <br><br>
            С учётом сложившейся международной обстановки, новая модель
            организационной деятельности однозначно определяет каждого участника
            как способного принимать собственные решения касаемо приоретизации
            разума над эмоциями. <br><br>
            Значимость этих проблем настолько очевидна, что высокое качество
            позиционных исследований предопределяет высокую востребованность
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
