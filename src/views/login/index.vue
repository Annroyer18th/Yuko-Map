<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <!-- <img class="login-icon" src="@/assets/images/logo.svg" alt="" /> -->
          <div class="logo-text">
            <h2>海洋环境噪声大数据</h2>
            <h2>特征挖掘与分析系统</h2>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue"
</script>

<style scoped lang="scss">
@import "index.scss";
</style>
