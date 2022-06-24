<template>
	<Select v-bind="getProps">
		<Select.Option v-for="item in _datas" :key="item.key">{{ item.value }}</Select.Option>
	</Select>
</template>

<script lang="ts" setup>
import { computed, watch, watchEffect } from "vue";
import type { PropType } from "vue";
import { Select } from "ant-design-vue";
import { selectProps } from "ant-design-vue/es/select";
import { useAxios } from "@/hooks/useAxios";
import type { ResponsetData, SelectOptionData } from "@/api/interface";
import { isFunction } from "@/utils/is";

const props = defineProps({
	...selectProps(),
	api: {
		type: Function as PropType<(arg?: any) => Promise<ResponsetData>>
	},
	datas: {
		type: Array as PropType<SelectOptionData[]>
	},
	params: {
		type: Object as PropType<Object>,
		default: () => {}
	}
});

const getProps = computed(() => props);

const _datas = computed(() => {
	return props.datas;
});

const _params = computed(() => props.params);

watch(
	() => props.params,
	() => {
		fetch();
	}
);

watchEffect(() => {
	fetch();
});

function fetch() {
	const api = props.api;
	if (!api || !isFunction(api)) {
		return;
	}
	const { data } = useAxios(props.api, _params);
	console.log(data);
}
</script>
