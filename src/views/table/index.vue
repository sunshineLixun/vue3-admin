<template>
	<Form class="search-form" ref="formRef" name="formRef" :model="formData" @finish="search.onSumbit">
		<Row :gutter="24">
			<Col span="3">
				<Form.Item name="name">
					<Input v-model:value="formData.name" placeholder="姓名" allowClear />
				</Form.Item>
			</Col>
			<Col span="3">
				<Form.Item name="age">
					<Select v-model:value="formData.gender" :options="selectData" allowClear placeholder="请选择性别" />
				</Form.Item>
			</Col>
			<Col span="3">
				<Form.Item name="height">
					<Input v-model:value="formData.height" placeholder="请输入身高" allowClear />
				</Form.Item>
			</Col>
			<Col span="3">
				<Form.Item name="time">
					<DatePicker v-model:value="formData.time" placeholder="请选择时间" allowClear />
				</Form.Item>
			</Col>
			<Col span="3">
				<Form.Item name="weight">
					<Input v-model:value="formData.weight" placeholder="请输入体重" allowClear />
				</Form.Item>
			</Col>
			<Col span="3">
				<Form.Item name="navigation">
					<ApiSelect :datas="navigaDatas" />
				</Form.Item>
			</Col>
		</Row>
		<div class="btn-searchs">
			<Space>
				<Button type="primary" :html-type="'submit'" :loading="tableProps.loading">
					<template #icon>
						<SearchOutlined />
					</template>
					查询
				</Button>
				<Button @click.prevent="search.onReset">
					<template #icon>
						<UndoOutlined />
					</template>
					重置
				</Button>
				<Button type="link">
					展开
					<DownOutlined />
				</Button>
			</Space>
		</div>
	</Form>
	<Table v-bind.prop="tableProps" :columns="columns" @change="onChange" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { FormInstance } from "ant-design-vue";
import { SearchOutlined, UndoOutlined, DownOutlined } from "@ant-design/icons-vue";
import { Table, Form, Input, Row, Col, Select, Button, Space, DatePicker } from "ant-design-vue";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { useAntdTable } from "@/hooks/useAntdTable";
import { listApi } from "@/api/modules/list";
import { ApiSelect } from "@/components/basic/select";
import type { SelectOptionData } from "@/api/interface/index";

interface FormState {
	name: string;
	gender: string;
	height: string;
	time: string;
	weight: string;
	navigation: string;
}

const formRef = ref<FormInstance>();

const formData = ref<FormState>({
	name: "123",
	gender: "2",
	height: "",
	time: "",
	weight: "",
	navigation: ""
});

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

const { tableProps, search, onChange } = useAntdTable(listApi, {
	form: formRef
});
</script>

<style lang="scss" scoped>
.search-form {
	position: relative;
}
.btn-searchs {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
