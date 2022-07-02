<template>
	<Table v-bind.prop="tableProps" :columns="columns" />
</template>
<script setup lang="ts">
import { Table } from "ant-design-vue";
import { useAntdTable } from "@/hooks/useAntdTable";
import { listApi } from "@/api/modules/list";

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

const { tableProps } = useAntdTable(listApi);
</script>

<style lang="scss">
.select {
	width: 100px;
}
</style>
