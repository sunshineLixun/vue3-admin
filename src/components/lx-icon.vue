<template>
  <div class="count">{{ count.count }}</div>
  <span>{{ props.icon }}</span>
  <button @click="onAdd">点我</button>
</template>

<script setup lang="ts">
import { reactive, defineProps } from "vue";

const props = defineProps({
  icon: String,
});

console.log(props);

const count = reactive({
  count: 1,
});

function onAdd() {
  count.count++;
}
</script>

<style scoped>
.count {
  color: aqua;
}
</style>
