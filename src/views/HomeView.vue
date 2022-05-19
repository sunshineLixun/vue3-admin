<script setup lang="ts">
import LXIcon from "../components/lx-icon.vue";
import LXAlert from "../components/lx-alert.vue";
import Button, { DataSource } from "../components/button";
import { toRaw } from "@vue/reactivity";

function onAdd(values: DataSource[]) {
  console.log(toRaw(values));
}
</script>

<template>
  <main>
    <LXIcon icon="xx" />
    <LXAlert />
    <Button title="hhhhh" @add="onAdd" />
  </main>
</template>
