<template>
	<Table :data-source="tableProps.dataSource" :columns="columns" :loading="tableProps.loading" :pagination="pagination" />
</template>
<script setup lang="ts">
import { Table } from "ant-design-vue";
import { useAntdTable } from "@/hooks/useAntdTable";
import { listApi } from "@/api/modules/list";
import { watch } from "vue";

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

const { tableProps, pagination } = useAntdTable(listApi);
watch(pagination, newVal => console.log(newVal));
</script>

<style lang="scss">
.select {
	width: 100px;
}
</style>
