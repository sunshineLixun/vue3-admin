<template>
	<QueryFilter :model="formModel" @finish="handleSubmit">
		<Form.Item name="name">
			<Input v-model:value="formModel.name" placeholder="请输入" />
		</Form.Item>
		<Form.Item name="creater">
			<Input v-model:value="formModel.creater" placeholder="请输入" />
		</Form.Item>
	</QueryFilter>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { QueryFilter } from "@/components/core/form/query-filter";
import { Form, Input } from "ant-design-vue";

const formModel = ref({
	name: "123",
	creater: ""
});

function handleSubmit(params: any) {
	console.log(params);
}
</script>
