export function getMessgae(langs: Record<string, Record<string, any>>) {
	let obj: Record<string, any> = {};
	Object.keys(langs).forEach(key => {
		const langFileModule = langs[key].default;
		const paths = key.split("/");
		// 倒数第二个
		const prevPath = paths[paths.length - 2];
		const lastPath = paths[paths.length - 1];
		const lastIndex = lastPath.lastIndexOf(".");

		const moduleName = lastPath.substring(0, lastIndex);
		if (prevPath) {
			if (typeof obj[prevPath] === "undefined") {
				obj[prevPath] = {} as Record<string, any>;
			}
			obj[prevPath][moduleName] = langFileModule;
		} else {
			obj[moduleName] = langFileModule;
		}
	});
	console.log(obj);
	return obj;
}
