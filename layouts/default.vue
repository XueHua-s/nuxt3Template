<template>
  <header
  :class="{
    'home_header': route.path === '/' && scrollTop <= 200,
    'fixed': route.path === '/' || scrollTop > 200
  }"
  >
    <div class="main_logo">
      <img v-if="route.path === '/' && scrollTop <= 200" src="../assets/images/logo.png" />
      <img v-else src="../assets/images/logo2.png" />
    </div>
    <ul>
      <template
      v-for="item of tabsList"
      :key="item.url"
      >
        <li>
          <NuxtLink class="f16" :class="{
            alive: route.path === item.url,
            home_header_tab: route.path === '/' && scrollTop <= 200
          }" :to="item.url">{{item.label}}</NuxtLink>
        </li>
      </template>
    </ul>
  </header>
  <main>
    <slot name="default" />
    <div class="description" v-if="route.path !== '/joinWe' && route.path !== 'writeAReview'">
      <div class="content">
        <p>
          {{data.info.capitalizeTheDescription}}}
        </p>
        <span>
        {{data.info.lowercaseDescription}}}
      </span>
        <nuxt-link to="/joinWe">联系我们</nuxt-link>
      </div>
    </div>
  </main>
  <footer>
    <div class="links">
      <ul>
        <li
        v-for="item of data.links"
        :key="item.id"
        >
          <NuxtLink :to="item.link" target="_blank">
            {{item.title}}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="icpNumber">
      {{data.info.icp}}
    </div>
  </footer>
  <!--超过200px增加返回顶部-->
  <NBackTop :show="scrollTop > 200" :right="50" :bottom="50">
    <div class="back-top">
      <svg class="wp20 color-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="48" d="M112 328l144-144l144 144"></path></svg>
    </div>
  </NBackTop>
</template>
<script setup>
import {useRoute} from "#app"
import { NBackTop } from 'naive-ui'
import useScroll from '../utils/useScroll.js'
const route = useRoute()
const { data } = useAsyncData(async () => {
  const links = await $fetch('/api/footer/links', {
    method: 'GET'
  })
  const info = await $fetch('/api/footer/info', {
    method: 'GET'
  })
  return {
    links,
    info
  }
})
const tabsList = [
  {
    label: '首页',
    url: '/'
  },
  {
    label: '加入我们',
    url: '/joinWe'
  },
  {
    label: '新闻与资讯',
    url: '/news'
  },
  {
    label: '关于华瓴',
    url: '/about'
  },
  {
    label: '投资者关系',
    url: '/investor'
  }
]
const scrollTop = useScroll()
</script>
<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 10px 100px;
  display: flex;
  align-items: center;
  transition-duration: 200ms;
  border-bottom: 1px solid #D9D9D9;
  &.fixed {
    position: fixed;
    width: 100%;
    z-index: 1000;
  }
  &.home_header {
    background-color: rgba(0,0, 0,0);
    border: none;
  }
  .main_logo {
    width: 25%;
    >img {
      width: 149px;
    }
  }
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    li {
      padding: 20px;
      a {
        position: relative;
        color: #000;
        transition-duration: 400ms;
        text-decoration: none;
        &.home_header_tab {
          color: #fff;
        }
        &:hover {
          color: var(--hl-home-tab-h-c);
        }
        &.alive {
          color: var(--hl-home-tab-h-c);
          &::before {
            content: '';
            width: 100%;
            position: absolute;
            height: 2px;
            border-radius: 2px;
            background-color: var(--hl-home-tab-h-c);
            bottom: -25px;
          }
        }
      }
    }
  }
}
footer {
  background-color: #D9D9D9;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  >.links {
    >ul {
      display: flex;
      list-style: none;
      margin-bottom: 20px;
      >li {
        >a {
          text-decoration: none;
          color: #000;
          font-size: 14px;
          transition-duration: 100ms;
          &:hover {
            color: var(--hl-home-tab-h-c);
          }
        }
      }
    }
  }
  >.icpNumber {
    color: #000;
    font-size: 14px;
  }
}
.description {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 673px;
  background-image: url('../assets/images/indexDescription.png');
  background-size: cover;
  background-repeat: no-repeat;
  >.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1066px;
    >p {
      font-size: 24px;
      font-weight: 900;
      margin-top: 20px;
      font-style: italic;
      text-align: center;
    }
    >span {
      font-size: 16px;
      margin-top: 20px;
    }
    >a {
      width: 164px;
      height: 44px;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #fff;
      border-radius: 4px;
      margin-top: 20px;
      text-decoration: none;
      background-color: var(--hl-home-tab-h-c);
    }
  }
}
</style>
