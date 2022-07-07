<template>
	<Form ref="formRef" name="formRef" :model="formData" @finish="search.onSumbit">
		<Row :gutter="24">
			<Col span="8">
				<Form.Item name="name" label="姓名"> <Input v-model:value="formData.name" /> </Form.Item
			></Col>
			<Col span="8">
				<Form.Item name="age" required label="年龄" :rules="[{ required: true, message: 'Please input your username!' }]">
					<Select v-model:value="formData.age" :options="selectData" allowClear /> </Form.Item
			></Col>
			<Col span="8">
				<Form.Item name="switch" label="开启"> <Switch v-model:checked="formData.switch" /> </Form.Item
			></Col>
		</Row>
		<Row justify="end">
			<Form.Item>
				<Button type="primary" :html-type="'submit'">
					<template #icon><SearchOutlined /></template>
					查询</Button
				>
				<Button @click.prevent="search.onReset">
					<template #icon><UndoOutlined /></template>
					重置</Button
				>
			</Form.Item>
		</Row>
	</Form>
	<Table v-bind.prop="tableProps" :columns="columns" @change="onChange" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons-vue";
import { Table, Form, Input, Row, Col, Select, Switch, Button } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { useAntdTable } from "@/hooks/useAntdTable";
import { listApi } from "@/api/modules/list";

interface FormState {
	name: string;
	age: number;
	switch: boolean;
}

const formRef = ref<FormInstance>();

const formData = ref<FormState>({
	name: "123",
	age: 2,
	switch: true
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

const columns: ColumnsType = [
	{
		title: "序号",
		dataIndex: "id",
		sorter: true
	},
	{
		title: "姓名",
		dataIndex: "name"
	}
];

const { tableProps, search, onChange } = useAntdTable(listApi, {
	form: formRef
});
</script>

<style lang="scss"></style>
