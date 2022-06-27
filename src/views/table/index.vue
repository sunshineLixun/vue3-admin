<template>
	<div>
		{{ t("routes.form.basicForm") }}
		{{ t("routes.table.table") }}
	</div>
</template>
<script setup lang="ts">
import { useI18nv } from "@/hooks/useI18n";
import { useAntdTable } from "@/hooks/useAntdTable";
import { listApi } from "@/api/modules/list";

useAntdTable(listApi, {
	params: [
		{
			current: 1,
			pageSize: 10
		}
	]
});

const { t } = useI18nv();
</script>

<style lang="scss">
.select {
	width: 100px;
}
</style>
