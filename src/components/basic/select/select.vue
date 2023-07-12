<template>
	<Select v-bind="props" v-model:value="selectValue">
		<Option v-for="item in _dataSource" :key="item.value">{{ item.title }}</Option>
	</Select>
</template>

<script lang="ts" setup>
import { computed, shallowRef, ref, watch, watchEffect } from "vue";
import type { PropType } from "vue";
import { Select } from "ant-design-vue";
import { selectProps, type SelectValue } from "ant-design-vue/es/select";
import type { ResponsetData, SelectOptionData } from "@/api/interface";
import { isFunction } from "@/utils/is";
import { useRequest } from "@/hooks/useRequest";
const Option = Select.Option;

interface Emits {
	(e: "update:value", val: string | number): void;
}


const props = defineProps({
	...selectProps(),
	// 默认值
	defaultValue: {
		type: [Array, Object, String, Number] as PropType<SelectValue>
	},
	api: {
		type: Function as PropType<(arg?: any) => Promise<ResponsetData>>
	},
	dataSource: {
		type: Array as PropType<SelectOptionData[]>
	},
	params: {
		type: Object as PropType<object>,
		default: () => {}
	},
	isShowFirst: {
		type: Boolean as PropType<boolean>,
		default: false
	}
});

const emit = defineEmits<Emits>();

const selectValue = ref(props.value === undefined ? props.defaultValue : props.value);
const options = shallowRef<SelectOptionData[]>([]);

const _dataSource = computed(() => {
	return options.value.length > 0 ? options.value : props.dataSource;
});

watch(
	() => props.value,
	() => {
		selectValue.value = props.value;
	}
);

watch(
	() => props.params,
	() => {
		fetch();
	}
);

watch(selectValue, newVal => {
	if (newVal) {
		emit("update:value", newVal as string | number);
	}
});

watchEffect(() => {
	fetch();
});

async function fetch() {
	const api = props.api;
	if (!api || !isFunction(api)) {
		return;
	}
	const { data } = useRequest<SelectOptionData[], any[]>(api, {
		defaultParams: [
			{
				...props.params
			}
		]
	});
	if (data.value) {
		options.value = data.value;
		if (props.isShowFirst) {
			selectValue.value = options.value[0].value;
			emit("update:value", selectValue.value);
		}
	}
}
</script>
