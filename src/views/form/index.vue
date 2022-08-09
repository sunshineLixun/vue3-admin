<template>
	<Form ref="formRef" name="formRef" layout="inline" :model="formData" @finish="onFinish">
		<Row :gutter="16">
			<Col span="6">
				<FormItem name="name" label="姓名"> <Input v-model:value="formData.name" /> </FormItem
			></Col>
			<Col span="6">
				<FormItem name="selectValue" required label="年龄" :rules="[{ required: true, message: 'Please input your username!' }]">
					<Select v-model:value="formData.selectValue" :options="selectData" allowClear /> </FormItem
			></Col>
			<Col span="6">
				<FormItem name="switchValue" label="开启"> <Switch v-model:checked="formData.switchValue" /> </FormItem
			></Col>
			<Col span="6"
				><FormItem> <Button type="primary" :html-type="'submit'">提交</Button> </FormItem></Col
			>
		</Row>
	</Form>
</template>

<script lang="ts" setup>
import { ref, unref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { FormItem, Input, Row, Col, Select, Switch, Button } from "ant-design-vue";

interface FormState {
	name: string;
	selectValue: number;
	switchValue: boolean;
}

const formRef = ref<FormInstance>();

const formData = ref<FormState>({
	name: "",
	selectValue: 2,
	switchValue: true
});

const selectData = ref([
	{
		value: 1,
		label: "1"
	},
	{
		value: 2,
		label: "2"
	}
]);

const onFinish = (values: any) => {
	console.log(values, unref(formRef)?.getFieldsValue());
};
</script>
