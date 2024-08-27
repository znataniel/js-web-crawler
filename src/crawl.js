import { JSDOM } from 'jsdom'
function normalizeURL(url) {
	if (url[url.length - 1] === "/") {
		url = url.slice(0, url.length - 1);
	}

	const myURL = new URL(url)
	return `${myURL.host}${myURL.pathname}`
}

function getURLsFromHTML(body, baseURL) {
	const dom = new JSDOM(body);
	const anchors = dom.window.document.querySelectorAll("a");
	let urls = [];
	for (let u of anchors) {
		if (!u.href) {
			continue;
		}
		u = u.href.trim()
		try {
			const url = new URL(u, baseURL);
			urls.push(url.href);
		}
		catch (err) {
			console.log(`ERROR: ${err}`);
		}
	}
	return urls;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
	const url = new URL(currentURL, baseURL);
	const base = new URL(baseURL);
	// console.log(`crawlPage(${url.href}) host:${url.host} - base: ${base.host}`);
	if (url.host !== base.host) {
		return pages;
	}
	const n_url = normalizeURL(url.href);
	if (pages[n_url]) {
		pages[n_url]++;
		return pages;
	}
	pages[n_url] = 1;
	// console.log(`----> about to fetch ${url.href}`);
	let response
	try {
		response = await fetch(url.href);
	} catch (err) {
		console.error(`${err.message} in ${url.href}`);
		return pages;
	}
	if (response.status >= 400) {
		console.error(`Request to ${url.href} failed with status code ${response.status}`);
		return pages;
	}
	const contentType = response.headers.get('Content-Type');
	if (!contentType || !contentType.includes('text/html')) {
		console.error(`${url.href} resource is not HTML --- content-type: ${contentType}`);
		return pages;
	}
	const html = await response.text();
	const anchors = getURLsFromHTML(html, baseURL);
	// console.log(`---anchors from ${url.href}\n${anchors}`);
	for (const a of anchors) {
		if (!pages[a]) {
			pages = await crawlPage(baseURL, a, pages)
		}
		else {
			pages[a]++;
		}
	}
	return pages;
}


export { normalizeURL, getURLsFromHTML, crawlPage };
