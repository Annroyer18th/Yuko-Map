<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名：admin">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="密码：123456"
        show-password
        autocomplete="new-password"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)">
      重置
    </el-button>
    <el-button
      :icon="UserFilled"
      round
      size="large"
      type="primary"
      :loading="loading"
      @click="login(loginFormRef)"
    >
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { useRouter } from "vue-router"
import { ElNotification } from "element-plus"

import { CircleClose, UserFilled } from "@element-plus/icons-vue"
import type { ElForm } from "element-plus"

const router = useRouter()

type FormInstance = InstanceType<typeof ElForm>
const loginFormRef = ref<FormInstance>()
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
})

const loading = ref(false)
const loginForm = reactive({
  username: "",
  password: ""
})

// login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async () => {
    // if (!valid) return
    loading.value = true
    try {
      // 4.跳转到地图
      if (loginForm.username === "admin" && loginForm.password === "123456") {
        router.push("/map")
        ElNotification({
          message: "欢迎登录 监测平台",
          type: "success",
          duration: 3000
        })
      } else {
        ElNotification({
          message: "用户名或密码错误",
          type: "warning",
          duration: 3000
        })
      }
    } finally {
      loading.value = false
    }
  })
}

// 重置输入
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 监听 enter 事件（调用登录）
onMounted(() => {
  document.onkeydown = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return
      login(loginFormRef.value)
    }
  }
})
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
