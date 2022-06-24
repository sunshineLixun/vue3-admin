<template>
	<Select v-bind="getProps">
		<Select.Option v-for="item in _datas" :key="item.id">{{ item.title }}</Select.Option>
	</Select>
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from "vue";
import type { PropType } from "vue";
import { Select } from "ant-design-vue";
import { selectProps } from "ant-design-vue/es/select";
import type { ResponsetData, SelectOptionData } from "@/api/interface";
import { isFunction } from "@/utils/is";

const props = defineProps({
	...selectProps(),
	api: {
		type: Function as PropType<(arg?: any) => Promise<ResponsetData<SelectOptionData[]>>>
	},
	datas: {
		type: Array as PropType<SelectOptionData[]>
	},
	params: {
		type: Object,
		default: () => {}
	}
});

const getProps = computed(() => props);

const _datas = computed(() => {
	return options.value.length > 0 ? options.value : props.datas;
});

watch(
	() => props.params,
	() => {
		fetch();
	}
);

watchEffect(() => {
	fetch();
});

const options = ref<SelectOptionData[]>([]);

async function fetch() {
	const api = props.api;
	if (!api || !isFunction(api)) {
		return;
	}
	try {
		const res = await api(props.params);
		console.log(res);

		if (res) {
			// TODO:
			// options.value = res;
		}
	} catch (error) {
		console.log(error);
	}
}
</script>
