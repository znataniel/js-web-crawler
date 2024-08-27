function sortPages(pages) {
	const sortable = [];
	for (const k in pages) {
		sortable.push([k, pages[k]]);
	}

	return sortable.sort((a, b) => b[1] - a[1]);
}

function report(pages) {
	if (!pages) {
		throw new Error('No page statistics received');
	}

	const sortedPages = sortPages(pages);

	for (const page of sortedPages) {
		console.log(`${page[0]} --- ${page[1]} internal entries`);
	}
}

export { report };
