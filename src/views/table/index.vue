<template>
	<TableForm>
		<template #formItem>
			<Col :span="3">
				<Form.Item name="name">
					<Input v-model:value="formData.name" placeholder="姓名" allowClear />
				</Form.Item>
			</Col>
			<Col :span="3">
				<Form.Item name="gender">
					<Select v-model:value="formData.gender" :options="selectData" allowClear placeholder="请选择性别" />
				</Form.Item>
			</Col>
			<Col :span="3">
				<Form.Item name="height">
					<Input v-model:value="formData.height" placeholder="请输入身高" allowClear />
				</Form.Item>
			</Col>
			<Col :span="3">
				<Form.Item name="time">
					<DatePicker v-model:value="formData.time" placeholder="请选择时间" allowClear />
				</Form.Item>
			</Col>
			<Col :span="3">
				<Form.Item name="weight">
					<Input v-model:value="formData.weight" placeholder="请输入体重" allowClear />
				</Form.Item>
			</Col>
			<Col :span="3">
				<Form.Item name="navigation">
					<ApiSelect v-model:value="formData.navigation" :datas="navigaDatas" placeholder="请选择民族" />
				</Form.Item>
			</Col>
			<Col :span="isExpand ? 3 : 0">
				<Form.Item name="birthday">
					<DatePicker v-model:value="formData.birthday" placeholder="请选择出生日期" allowClear />
				</Form.Item>
			</Col>
			<Col :span="isExpand ? 3 : 0">
				<Form.Item name="course">
					<Input v-model:value="formData.course" placeholder="请输入班级" allowClear />
				</Form.Item>
			</Col>
		</template>
	</TableForm>
	<Table v-bind.prop="tableProps" :columns="columns" @change="onChange" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { Table, Form, Input, Col, Select, DatePicker } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { useAntdTable } from "@/hooks/useAntdTable";
import { listApi } from "@/api/modules/list";
import { ApiSelect } from "@/components/basic/select";
import type { SelectOptionData } from "@/api/interface/index";
import { TableForm } from "@/components/core/table-form/index";

interface FormState {
	name: string;
	gender: string;
	height: string;
	time: string;
	weight: string;
	navigation?: string;
	birthday: string;
	course: string;
}

const formRef = ref<FormInstance>();

const formData = ref<FormState>({
	name: "123",
	gender: "2",
	height: "",
	time: "",
	weight: "",
	navigation: undefined,
	birthday: "",
	course: "小班"
});

const isExpand = ref(false);

const selectData = [
	{
		value: "1",
		label: "男"
	},
	{
		value: "2",
		label: "女"
	}
];

const navigaDatas: SelectOptionData[] = [
	{
		value: "1",
		title: "汉族"
	},
	{
		value: "2",
		title: "少数民族"
	}
];

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

const { tableProps, onChange } = useAntdTable(listApi, {
	form: formRef
});
</script>

<style lang="scss" scoped></style>
