<template>
	<div>{{ count }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
	setup() {
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
