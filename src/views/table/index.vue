<template>
	<div>
		{{ t("routes.form.basicForm") }}
		{{ t("routes.table.table") }}
		<Select class="select" :datas="selectDatas" v-model:value="selectValue" :api="selectListApi" />
	</div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useI18nv } from "@/hooks/useI18n";
import { useAxios } from "@/hooks/useAxios";
import { listApi, selectListApi } from "@/api/modules/list";
import type { List } from "@/api/interface/modules/list";
import { Select } from "@/components/basic/select";
import type { SelectOptionData } from "@/api/interface";
const { t } = useI18nv();

const params = ref<List.ListParams>({
	page: 1
});

const selectDatas = ref<SelectOptionData[]>([
	{
		key: 1,
		value: "name"
	},
	{
		key: 2,
		value: "age"
	}
]);
const selectValue = ref(1);

useAxios<List.ListParams, List.ListResponse>(listApi, params);
</script>

<style lang="scss">
.select {
	width: 100px;
}
</style>
