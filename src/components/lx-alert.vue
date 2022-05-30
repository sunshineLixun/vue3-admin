<template>
	<div>{{ count }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
	setup(props, ctx) {
		function onLoad() {
			console.log("onload");
		}

		ctx.expose({
			onLoad
		});

		const age = ref({
			name: "11"
		});
		const count = reactive({
			count: 1,
			age
		});
		age.value.name = "123";

		return {
			count
		};
	}
});
</script>
