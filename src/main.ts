import "./assets/styles/index.scss"

import { createApp } from "vue"
import { createPinia } from "pinia"

import "@/styles/reset.scss"
// CSS common style sheet
import "@/styles/common.scss"
// iconfont css
import "@/assets/iconfont/iconfont.scss"
// font css
import "@/assets/fonts/font.scss"
// element css
import "element-plus/dist/index.css"
// // element dark css
// import "element-plus/theme-chalk/dark/css-vars.css"
// // custom element dark css
// import "@/styles/element-dark.scss"
// custom element css
import "@/styles/element.scss"
// // svg icons
// import "virtual:svg-icons-register"

import App from "./App.vue"
import router from "./vendors/router"
// import I18n from "@/languages/index"
// // element plus
import ElementPlus from "element-plus"
// element icons
import * as Icons from "@element-plus/icons-vue"

const app = createApp(App)

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(ElementPlus).use(router).use(createPinia()).mount("#app")
