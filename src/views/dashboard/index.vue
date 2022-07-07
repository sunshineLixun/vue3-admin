<template>
	{{ t("routes.dashboard.dashboard") }}
	<Pagination
		v-model:current="current"
		:total="total"
		:page-size="pageSize"
		@change="change"
		@show-size-change="showSizeChange"
	/>
</template>

<script lang="ts" setup>
import { Pagination } from "ant-design-vue";
import { useI18nv } from "@/hooks/useI18n";
import { usePagination } from "@/hooks/usePagination";
import { listApi } from "@/api/modules/list";
const { t } = useI18nv();

const { current, total, pageSize, change, showSizeChange } = usePagination(listApi, {
	// 其他参数
	defaultParams: [
		{
			name: "123"
		}
	],
	defaultPageSize: 30
});
</script>
