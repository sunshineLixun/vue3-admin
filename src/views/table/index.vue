<template>
	<div>
		{{ t("routes.form.basicForm") }}
		{{ t("routes.table.table") }}
	</div>
</template>
<script setup lang="ts">
import { useI18nv } from "@/hooks/useI18n";
import { useAxios } from "@/hooks/useAxios";
import { listApi } from "@/api/modules/list";
import type { List } from "@/api/interface/modules/list";
import { ref } from "vue";
const { t } = useI18nv();

const parmas = ref<List.ListParams>({
	page: 1
});

useAxios<List.ListParams, List.ListResponse>(listApi, parmas);

parmas.value.page = 2;
</script>
