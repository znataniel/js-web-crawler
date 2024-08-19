function normalizeURL(url) {
	if (url[url.length - 1] === "/") {
		url = url.slice(0, url.length - 1);
	}

	const myURL = new URL(url)
	return `${myURL.host}${myURL.pathname}`
}

export { normalizeURL };
