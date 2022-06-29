<template>
	<Table :data-source="data?.itemList" :columns="columns" :loading="loading" :pagination="pagination" />
</template>
<script setup lang="ts">
import { Table } from "ant-design-vue";
import { useAntdTable } from "@/hooks/useAntdTable";
import { listApi } from "@/api/modules/list";
import { computed } from "@vue/reactivity";
import { useRequest } from "@/hooks/useRequest";

const columns = [
	{
		title: "序号",
		dataIndex: "id"
	},
	{
		title: "姓名",
		dataIndex: "name"
	}
];

const pagination = computed(() => ({
	total: data.value?.total,
	current: 1,
	pageSize: 10
}));

const { data, loading } = useAntdTable(listApi, {
	defaultParams: [
		{
			current: 1,
			pageSize: 10
		}
	]
});
useRequest(listApi);
</script>

<style lang="scss">
.select {
	width: 100px;
}
</style>
