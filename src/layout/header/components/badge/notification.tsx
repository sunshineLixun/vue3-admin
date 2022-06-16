import { defineComponent, ref } from "vue";
import { Tabs } from "ant-design-vue";

import { Pans } from "./constant";

export default defineComponent({
	setup() {
		const activeKey = ref(Pans[0].key);
		return () => {
			return (
				<Tabs v-model={activeKey.value}>
					{Pans.map(item => {
						return (
							<Tabs.TabPane key={item.key} tab={item.title}>
								{item.content}
							</Tabs.TabPane>
						);
					})}
				</Tabs>
			);
		};
	}
});
