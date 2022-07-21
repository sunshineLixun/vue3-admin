<template>
	<Form class="search-form" ref="formRef" name="formRef" :model="props.formData" @finish="onFinish">
		<Row :gutter="[8, 0]">
			<slot name="formItem"></slot>
			<Col :span="6" :offset="isExpand ? 18 : 0" class="btn-searchs">
				<Space>
					<Button type="primary" :html-type="'submit'">
						<template #icon>
							<SearchOutlined />
						</template>
						查询
					</Button>
					<Button>
						<template #icon>
							<UndoOutlined />
						</template>
						重置
					</Button>
					<Button class="expand" type="link" @click="isExpand = !isExpand">
						{{ isExpand ? "收起" : "展开" }}
						<DownOutlined v-if="!isExpand" />
						<UpOutlined v-else-if="isExpand" />
					</Button> </Space
			></Col>
		</Row>
	</Form>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { SearchOutlined, UndoOutlined, DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { Form, Button, Space, Row, Col } from "ant-design-vue";

const props = defineProps({
	formData: {
		type: Object,
		default: () => {}
	}
});

const isExpand = ref(false);

const onFinish = () => {};
</script>

<style lang="scss" scoped>
.search-form {
	position: relative;

	.ant-form-item {
		margin-bottom: 10px;
		.ant-picker {
			width: 100%;
		}
	}

	.btn-searchs {
		display: flex;
		align-items: flex-start;
		justify-content: end;
		margin-bottom: 10px;
		.ant-btn-link {
			padding: 0;
		}
	}
}
</style>
