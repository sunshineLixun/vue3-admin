<template>
	<Space :style="props.style" class="btn-searchs">
		<Button type="primary" @click="submit">
			<template #icon>
				<SearchOutlined />
			</template>
			查询
		</Button>
		<Button @click="resetForm">
			<template #icon>
				<UndoOutlined />
			</template>
			重置
		</Button>
		<Button class="expand" type="link" @click="onCollapsed">
			{{ props.collapsed ? "收起" : "展开" }}
			<UpOutlined v-if="props.collapsed" />
			<DownOutlined v-else-if="!props.collapsed" />
		</Button>
	</Space>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Space, Button } from "ant-design-vue";
import type { CSSProperties } from "@vue/runtime-dom";
import { SearchOutlined, UndoOutlined, DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { useFormInstance } from "@/components/core/base-form/hooks/useFormInstance";

type ActionsProps = {
	style?: CSSProperties;
	collapsed?: boolean;
};

const { submit, resetForm } = useFormInstance();

const props = defineProps<ActionsProps>();

const emit = defineEmits<{
	(e: "collapsed", collapsed: boolean): void;
}>();

const onCollapsed = () => {
	emit("collapsed", !props.collapsed);
};
</script>

<style lang="scss" scoped>
.btn-searchs {
	display: flex;
	align-items: flex-start;
	justify-content: end;
	margin-bottom: 10px;
	.ant-btn-link {
		padding: 0;
	}
}
</style>
