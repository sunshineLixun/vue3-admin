<template>
	<div mt-20px flex justify-center>
		{{ t("routes.dashboard.dashboard") }}
	</div>
</template>

<script lang="ts" setup>
import { useI18nv } from "@/hooks/useI18n";
const { t } = useI18nv();
</script>
