<template>
	{{ t("routes.dashboard.dashboard") }}
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useI18nv } from "@/hooks/useI18n";
const { t } = useI18nv();

const state = ref(1);

const state2 = ref(2);
state.value = state2.value;

setTimeout(() => {
	state2.value = 3;
}, 1000);

watch([state, state2], ([newVal, newVal2]) => {
	console.log(newVal, newVal2);
});
</script>
