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

async function crawlPage(url) {
	try {
		const response = await fetch(url);
		if (response.status >= 400) {
			throw Error(`Request to ${url} failed with status code ${response.status}`);
		}
		const contentType = response.headers.get('Content-Type');
		if (contentType.indexOf('text/html') === -1) {
			throw Error(`Resource is not HTML`);
		}
		const html = await response.text()
		console.log(html);
	}
	catch (err) {
		console.log(err);
	}

}

export { normalizeURL, getURLsFromHTML, crawlPage };
