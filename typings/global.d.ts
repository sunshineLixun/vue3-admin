import { EmitsOptions, SetupContext } from "vue";

declare global {
	declare type Recordable<T = any> = Record<string, T>;
	declare type EmitFn<E = EmitsOptions> = SetupContext<E>["emit"];
}
