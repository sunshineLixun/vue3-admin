import { defineComponent, ref } from "vue";
import { Tabs, List, Avatar } from "ant-design-vue";

import { pans, listData, DataItem } from "./constant";
import { avatar } from "@/utils/constant";

export default defineComponent({
	setup() {
		const activeKey = ref(pans[0].key);

		const renderListItem = (opt: { item: DataItem; index: number }) => {
			return (
				<List.Item>
					<List.Item.Meta title={opt.item.title} description={opt.item.description} avatar={<Avatar src={avatar} />} />
				</List.Item>
			);
		};

		return () => {
			return (
				<Tabs v-model={activeKey.value}>
					{pans.map(item => {
						return (
							<Tabs.TabPane key={item.key} tab={item.title}>
								<List dataSource={listData} renderItem={renderListItem} />
							</Tabs.TabPane>
						);
					})}
				</Tabs>
			);
		};
	}
});
