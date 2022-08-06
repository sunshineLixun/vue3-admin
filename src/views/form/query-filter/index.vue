<template>
	<QueryFilter :model="formModel" @finish="handleSubmit">
		<FormItem name="name">
			<Input v-model:value="formModel.name" placeholder="请输入" />
		</FormItem>
		<FormItem name="creater">
			<Input v-model:value="formModel.creater" placeholder="请输入" />
		</FormItem>
	</QueryFilter>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { QueryFilter } from "@/components/core/form/query-filter";
import { FormItem, Input } from "ant-design-vue";

const formModel = ref({
	name: "123",
	creater: ""
});

function handleSubmit(params: any) {
	console.log(params);
}
</script>
