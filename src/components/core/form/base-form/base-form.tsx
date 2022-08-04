import { defineComponent } from "vue";
import { Form } from "ant-design-vue";
import { pick } from "lodash";
import { baseFromEmits, aFormPropKeys, baseFormProps } from "./types";
import { useFormState } from "./hooks/useFormState";
import { useFromEvents } from "./hooks/useFormEvents";
import { useFormMethods } from "./hooks/useFormMethods";
import { createFromInstance } from "./hooks/useFormInstance";

export const BaseForm = defineComponent({
	props: baseFormProps,
	emits: baseFromEmits,
	setup(props, { attrs, emit, expose, slots }) {
		const fromState = useFormState({ props, attrs });
		const { model, formInstanceRef, getFormProps } = fromState;

		const formMethods = useFormMethods();
		const { handleFormValues } = formMethods;

		const formEvents = useFromEvents({ ...fromState, emit, handleFormValues });

		const instance = {
			...fromState,
			...formEvents,
			...formMethods
		};

		createFromInstance(instance);
		expose(instance);

		return () => {
			return (
				<Form class="base-form" ref={formInstanceRef} {...pick(getFormProps, aFormPropKeys)} model={model}>
					{slots.default ? slots.default() : undefined}
				</Form>
			);
		};
	}
});
