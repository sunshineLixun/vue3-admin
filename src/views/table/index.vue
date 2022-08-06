<template>
	<ProTable v-bind="proTableProps">
		<FormItem name="name">
			<Input v-model:value="formData.name" placeholder="姓名" allowClear />
		</FormItem>
		<FormItem name="gender">
			<Select v-model:value="formData.gender" :options="selectData" allowClear placeholder="请选择性别" />
		</FormItem>
		<FormItem name="height">
			<Input v-model:value="formData.height" placeholder="请输入身高" allowClear />
		</FormItem>
		<FormItem name="time">
			<DatePicker v-model:value="formData.time" placeholder="请选择时间" allowClear />
		</FormItem>
		<FormItem name="weight">
			<Input v-model:value="formData.weight" placeholder="请输入体重" allowClear />
		</FormItem>
		<FormItem name="navigation">
			<ApiSelect v-model:value="formData.navigation" :datas="navigaDatas" placeholder="请选择民族" />
		</FormItem>
		<FormItem name="birthday">
			<DatePicker v-model:value="formData.birthday" placeholder="请选择出生日期" allowClear />
		</FormItem>
		<FormItem name="course">
			<Input v-model:value="formData.course" placeholder="请输入班级" allowClear />
		</FormItem>
	</ProTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { FormItem, Input, Select, DatePicker } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { listApi } from "@/api/modules/list";
import { ApiSelect } from "@/components/basic/select";
import type { SelectOptionData } from "@/api/interface";
import { ProTable } from "@/components/core/table";
import type { FormProps, ProTableProps } from "@/components/core/table/types";

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

const formProps: FormProps = {
	model: formData,
	rules: {
		name: [{ required: true, message: "请输入姓名" }]
	}
};

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

const proTableProps: ProTableProps = {
	columns,
	formProps,
	requestApi: listApi
};
</script>

<style lang="scss" scoped></style>
