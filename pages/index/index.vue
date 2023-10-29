<template>
  <!--  seo优化标签-->
  <title>首页</title>
  <div class="banner">
    <NCarousel autoplay>
      <template v-for="(item, index) of data.banners"
      :key="index"
      >
        <img class="carousel-img" :src="item.img" />
      </template>
    </NCarousel>
  </div>
  <div class="about">
    <div class="title-line f14">
      ABOUTUS
    </div>
    <h2 class="f30 color-white">关于华瓴</h2>
    <div class="steps flex">
      <div class="setps_left">
        <ul>
          <li
          class="f24 color-white"
          v-for="(item, index) of data.abouts"
          @click="currentSetup = index;"
          :key="index"
          >
            <span
            :class="{
            alive: index === currentSetup
          }"
            >
              {{item.productName}}
            </span>
          </li>
        </ul>
        <p style="opacity: 0.5;" class="color-gray f14 mt30">更多产品敬请期待...</p>
      </div>
      <div class="setps_right flex">
        <div class="flex-item-1">
          <h3 class="f20 color-white mb20 txt-ct">
            {{data.abouts[currentSetup].title}}
          </h3>
          <p class="color-white f14">
            {{data.abouts[currentSetup].content}}
          </p>
          <a class="learnMore" :href="data.abouts[currentSetup].link" target="_blank">了解更多</a>
        </div>
        <img class="wp600 ml30" :src="data.abouts[currentSetup].img" alt="">
      </div>
    </div>
  </div>
  <div class="news">
    <div class="title-line f14">
      NEWS AND INFORMATION
    </div>
    <h2 class="f30 mt20">新闻与资讯</h2>
    <div class="new_body">
      <div class="primary">
        <img :src="data.news[0].img" alt="">
        <div class="flex flex-mc mt20 mb20">
          <span class="date f16">
            {{dayjs(data.news[0].createdTime).format('MM/DD')}}
          </span>
          <h3 class="f20">{{data.news[0].title}}</h3>
        </div>
        <p class="f14">
          {{data.news[0].content}}
        </p>
      </div>
      <aside class="flex-item-1">
        <ul>
          <li v-for="index in data.news.length - 1"
          :key="index"
          >
            <div class="left">
              <div class="date">
                {{dayjs(data.news[index].createdTime).format('MM-DD')}}
              </div>
              <div class="year">
                {{dayjs(data.news[index].createdTime).format('YYYY')}}
              </div>
            </div>
            <div class="right">
              <NuxtLink to="/" class="f14">
                {{data.news[index].title}}
              </NuxtLink>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </div>
  <div class="notes">
    <header class="flex flex-sb">
      <h3 class="f30">华瓴大事记</h3>
      <h3 class="f30">Hualing Chronicles</h3>
    </header>
    <simple class="flex">
      <div class="left flex-item-1"
      :class="{
        notesShowShake: noteAnimalTag
      }"
      >
        <h3 class="f30">{{data.notes[currentNote].title}}</h3>
        <p class="f14">
          {{data.notes[currentNote].content}}
        </p>
      </div>
      <div class="img">
        <div
        :class="{
          notesShowShake: noteAnimalTag
        }"
        :style="`background-image: url(${data.notes[currentNote].img})`"
        class="show-pic">
        </div>
        <div class="operate">
          <span
          :class="{
            // 'pointer-events': currentNote === 0
          }"
          @click="toggleEvents(2)"><svg class="color-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z" fill="currentColor"></path></svg></span>
          <span
          :class="{
            // 'pointer-events': currentNote === (data.notes.length - 1)
          }"
          @click="toggleEvents(1)"><svg class="color-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4l-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" fill="currentColor"></path></svg></span>
        </div>
      </div>
      <div class="right flex-item-1"
       :class="{
        notesShowShake: noteAnimalTag
      }"
      >
        <h3 class="f30">{{data.notes[getNextNoteIndex(currentNote)]?.title}}</h3>
        <p class="f14">
          {{data.notes[getNextNoteIndex(currentNote)]?.content}}
        </p>
      </div>
      <div class="steups-line">
        <div
        v-for="index in 3"
        :key="index"
        :class="{
          alive: noteReturnRadiusAlive(index)
        }"
        class="radius-step">
        </div>
      </div>
    </simple>
  </div>
</template>
<script setup>
import { NCarousel } from 'naive-ui'
import lodash from "lodash";
import dayjs from "dayjs";
// 导入客户端环境变量
// const returnTime = useRuntimeConfig()
// 服务端渲染数据
const { data } = await useAsyncData( async () => {
  const banners = await $fetch('/api/home/banner', {
    method: 'GET'
  })
  const abouts = await $fetch('/api/home/about', {
    method: 'GET'
  })
  const news = await $fetch('/api/home/news', {
    method: 'GET'
  })
  const notes = await $fetch('/api/home/notes', {
    method: 'GET'
  })
  return {
    banners,
    abouts,
    // 冒泡排序, 时间降序
    news: lodash.sortBy(news, (item) => -item.createdTime),
    notes
  }
})
// 当前展示的关于下标
const currentSetup = ref(0)
// 当前浏览事记的下标
const currentNote = ref(0)
const noteAnimalTag = ref(true)
const toggleEvents = (type) => {
  if (type === 1) {
    // 加
    if (currentNote.value === (data.value?.notes?.length - 1)) {
      currentNote.value = 0
      return
    }
    currentNote.value++
  } else {
    if (currentNote.value === 0) {
      currentNote.value = (data.value?.notes?.length - 1)
      return
    }
    // 减
    currentNote.value--
  }
  noteAnimalTag.value = false
  setTimeout(() => {
    noteAnimalTag.value = true
  }, 100)
}
// 获取事记是否选中
const noteReturnRadiusAlive = (index) => {
  switch (index) {
    case 1:
      return ((currentNote.value + 1) % 3) === 1
      break;
    case 2:
      return ((currentNote.value + 1) % 3) === 2
      break;
    case 3:
      return ((currentNote.value + 1) % 3) === 0
      break;
  }
}
// 获取下一事件
const getNextNoteIndex = (index) => {
  if (index === (data.value?.notes?.length - 1)) {
    return 0
  } else {
    return (index + 1)
  }
}
</script>
<style scoped lang="scss">
.carousel-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}
:deep(.n-carousel.n-carousel--bottom .n-carousel__dots) {
  bottom: 5% !important;
}
.about {
  width: 100%;
  padding: 100px 0 23px 100px;
  background-color: #000;
  >.title-line {
    color: #fff;
    padding-left: 57px;
    position: relative;
    &::before {
      content: '';
      width: 47px;
      height: 2px;
      background-color: #fff;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  >.steps {
    margin-top: 55px;
    >.setps_left {
      display: flex;
      flex-direction: column;
      width: 150px;
      >ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        border-right: 1px solid #5e5d5d;
        li {
          margin-bottom: 60px;
          cursor: pointer;
          >span {
            position: relative;
            transition-duration: 400ms;
            &:hover {
              color: var(--hl-home-tab-h-c);
            }
            &.alive {
              color: var(--hl-home-tab-h-c);
              &::before {
                content: '';
                position: absolute;
                width: 40px;
                height: 2px;
                background-color: var(--hl-home-tab-h-c);
                right: -62px;
                top: 50%;
                transform: translateY(-50%);
              }
              &::after {
                content: '';
                height: 26px;
                width: 6px;
                background-color: var(--hl-home-tab-h-c);
                position: absolute;
                right: -107px;
                top: 50%;
                transform: translateY(-50%) translateX(-50%);
                border-radius: 12px;
              }
            }
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    >.setps_right {
      flex: 1;
      padding-left: 144px;
      .learnMore {
        display: inline-block;
        color: var(--hl-home-tab-h-c);
        text-decoration: none;
        padding: 12px;
        font-size: 16px;
        margin-top: 100px;
        cursor: pointer;
        border-radius: 12px;
        border: 1px solid var(--hl-home-tab-h-c);
      }
    }
  }
}
.news {
  background-color: #fff;
  padding: 100px 100px 100px 100px;
  >.title-line {
    color: #000;
    padding-left: 57px;
    position: relative;
    &::before {
      content: '';
      width: 47px;
      height: 2px;
      background-color: #000;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  >.new_body {
    padding-left: 423px;
    display: flex;
    >.primary {
      width: 692px;
      margin-right: 152px;
      >img {
        width: 692px;
      }
      .date {
        color: var(--hl-home-tab-h-c);
        font-weight: 900;
        margin-right: 8px;
      }
    }
    >aside {
      >ul {
        list-style: none;
        >li {
          display: flex;
          padding-bottom: 40px;
          padding-top: 20px;
          border-bottom: 2px solid #000;
          &:last-child {
            border: none;
            padding-bottom: 0;
          }
          //align-items: center;
          .left {
            >.date {
              font-size: 30px;
              width: 100px;
              font-weight: 900;
            }
            >.year {
              color: #999;
              font-size: 16px;
            }
            margin-right: 21px;
          }
          .right {
            margin-top: 5px;
            cursor: pointer;
            >a {
              transition-duration: 400ms;
              text-decoration: none;
              color: #000;
            }
            &:hover {
              >a {
                color: #D7261E;
              }
            }
          }
        }
      }
    }
  }
}
.notes {
  background-color: #F5F5F5;
  padding: 68px 100px;
  @keyframes notesShowShake {
    from {
      opacity: 0;
      /* cursor: not-allowed; */
    }
    to {
      opacity: 1;
    }
  }
  .notesShowShake {
    animation: notesShowShake 800ms;
  }
  >simple {
    margin-top: 136px;
    position: relative;
    min-height: 500px;
    >.left {
      padding-top: 303px;
      >h3 {
        margin-bottom: 20px;
      }
    }
    >.img {
      position: relative;
      width: 434px;
      height: 434px;
      //margin-top: auto;
      z-index: 3;
      >.show-pic {
        border-radius: 50%;
        width: 434px;
        height: 434px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      >.operate {
        width: 127px;
        height: 50px;
        display: flex;
        position: absolute;
        bottom: 0;
        right: 0;
        align-items: center;
        &::before {
          content: '';
          width: 1px;
          height: 16px;
          background-color: #fff;
          position: absolute;
          right: 50%;
          transform: translateX(-50%);
        }
        .pointer-events {
          background-color: #8b8080;
        }
        > span {
          cursor: pointer;
          background-color: var(--hl-home-tab-h-c);
          transition-duration: 200ms;
          &:active {
            background-color: #ac0909;
          }
          >svg {
            width: 17px;
            transform: translateY(5px);
            //margin-top: 5px;
          }
          flex: 1;
          text-align: center;
        }
      }
    }
    >.right {
      padding-top: 303px;
      padding-left: 60px;
      >h3 {
        margin-bottom: 20px;
      }
    }
    >.steups-line {
      z-index: 0;
      width:80%;
      position: absolute;
      right: 0;
      top: 65px;
      border-top: 1px solid #000;
      >.radius-step {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #000;
        position: absolute;
        left: 0;
        top: 0;
        transform: translateY(-50%);
        transition-duration: 400ms;
        &.alive {
          background-color: #ac0909;
        }
        &:nth-child(2) {
          left: 65%;
        }
        &:nth-child(3) {
          left: 95%;
        }
      }
    }
  }
}
</style>
