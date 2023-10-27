import {shakeFun} from "~/utils/shakeAndThrottle.js"
export default () => {
  const pageScroll = ref(0)
  const updateScroll = shakeFun(() => {
    pageScroll.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  }, 200)
  onMounted(() => {
    window.addEventListener('scroll', (e) => {
      updateScroll()
    })
  })
  return pageScroll
}
