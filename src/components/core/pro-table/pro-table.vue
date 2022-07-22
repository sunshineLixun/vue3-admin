<template>
	<TableForm :formData="props.formData">
		<template #formItem>
			<slot name="form" />
		</template>
	</TableForm>
	<Table :columns="props.columns" />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import type { PropType } from "vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { Table } from "ant-design-vue";
import TableForm from "../table-form/table-form.vue";

// TODO: table request、 table props

const props = defineProps({
	formData: {
		type: Object as PropType<object>,
		default: () => {}
	},
	columns: {
		type: Array as PropType<ColumnsType>
	}
});
</script>
