import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import Charts from "@/components/openlayers/components/Charts/index.vue"
import Login from "@/views/login/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/map",
      name: "home",
      component: HomeView
    },
    {
      path: "/charts",
      name: "charts",
      component: Charts
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      redirect: "/login"
    }
  ]
})

export default router
