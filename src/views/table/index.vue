<template>
	<div>
		{{ t("routes.form.basicForm") }}
		{{ t("routes.table.table") }}
		<Select class="select" :api="selectListApi" />
	</div>
</template>
<script setup lang="ts">
import { useI18nv } from "@/hooks/useI18n";
import { selectListApi } from "@/api/modules/list";
import { Select } from "@/components/basic/select";
const { t } = useI18nv();
</script>

<style lang="scss">
.select {
	width: 100px;
}
</style>
