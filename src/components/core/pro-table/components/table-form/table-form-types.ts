import type { ExtractPropTypes } from "vue";
import { baseFormProps } from "@/components/core/base-form/base-from-types";

export const tableFormProps = {
	...baseFormProps
};

export type TableFormProps = Partial<ExtractPropTypes<typeof tableFormProps>>;
