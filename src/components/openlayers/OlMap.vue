<template>
  <div data-tag="olMap">
    <AddressLayer @click="onClick"></AddressLayer>
    <AddressPopup :feature="state.activeAddress"></AddressPopup>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import { AddressLayer, AddressPopup } from "./components"
import { useProvideContext } from "./hooks"

const appContext = useProvideContext()

const state = reactive({
  activeAddress: null
})

function onClick(e: any) {
  console.log("🚀 -> onClick -> e:", e)
  state.activeAddress = e
}
</script>
