export function getMessgae(langs: Record<string, Record<string, any>>) {
	let obj: Record<string, any> = {};
	Object.keys(langs).forEach(key => {
		const langFileModule = langs[key].default;
		const paths = key.split("/");
		const lastPath = paths[paths.length - 1];
		const lastIndex = lastPath.lastIndexOf(".");

		const moduleName = lastPath.substring(0, lastIndex);
		obj[moduleName] = langFileModule;
	});
	return obj;
}
