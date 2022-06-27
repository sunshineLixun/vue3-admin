<template>
	<Form ref="formRef" name="formRef" layout="inline" :model="formData" @finish="onFinish">
		<Row :gutter="16">
			<Col span="6">
				<Form.Item name="name" label="姓名"> <Input v-model:value="formData.name" /> </Form.Item
			></Col>
			<Col span="6">
				<Form.Item name="selectValue" required label="年龄" :rules="[{ required: true, message: 'Please input your username!' }]">
					<Select v-model:value="formData.selectValue" :options="selectData" allowClear /> </Form.Item
			></Col>
			<Col span="6">
				<Form.Item name="switchValue" label="开启"> <Switch v-model:checked="formData.switchValue" /> </Form.Item
			></Col>
			<Col span="6"
				><Form.Item> <Button type="primary" :html-type="'submit'">提交</Button> </Form.Item></Col
			>
		</Row>
	</Form>
</template>

<script lang="ts" setup>
import { ref, unref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { Form, Input, Row, Col, Select, Switch, Button } from "ant-design-vue";

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
