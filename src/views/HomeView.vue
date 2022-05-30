<template>
	<main>
		<LXIcon icon="xx" />
		<LXAlert ref="alert" />
		<Button title="hhhhh" @add="onAdd" />
	</main>
</template>
<script setup lang="ts">
import LXIcon from "../components/lx-icon.vue";
import LXAlert from "../components/lx-alert.vue";
import Button, { DataSource } from "../components/button";
import { toRaw, ref } from "@vue/reactivity";
import { onMounted } from "vue";

function onAdd(values: DataSource[]) {
	console.log(toRaw(values));
}
const alert = ref(null);

onMounted(() => {
	alert.value.onLoad();
});
</script>
