import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

/*
 * normalizeURL tests:
 * 	http://example.com/resource
 * 	http://example.com/resource/
 * 	https://example.com/resource
 * 	https://example.com/resource/
 *
 * 	we want to take this sample input and turn it into
 * 	a normalized form. These 4 cases would all convert to
 *
 * 	example.com/resource
 */

test(
	'test url normalization', () => {
		const testURL = "https://api.example.com/path/to/resource/";
		const expectedURL = "api.example.com/path/to/resource";
		expect(normalizeURL(testURL)).toBe(expectedURL);
	}
);



test(
	'test url normalization', () => {
		const testURL = "https://api.example.com/path/to/resource";
		const expectedURL = "api.example.com/path/to/resource";
		expect(normalizeURL(testURL)).toBe(expectedURL);
	}
);

test(
	'test url normalization', () => {
		const testURL = "http://api.example.com/path/to/resource/";
		const expectedURL = "api.example.com/path/to/resource";
		expect(normalizeURL(testURL)).toBe(expectedURL);
	}
);

test(
	'test url normalization', () => {
		const testURL = "http://api.example.com/path/to/resource";
		const expectedURL = "api.example.com/path/to/resource";
		expect(normalizeURL(testURL)).toBe(expectedURL);
	}
);


/*
 * getURLsFromHTML tests:
 *	the function receives a 'base' URL and the html body of the page,
 *	it then retrieves all of the anchor tags in the html
 *	and returns a list containing all of the ABSOLUTE URLs to each
 *	resource in the html page
 *
 *	e.g give the input
 *	<html>
 *		<a href="/path/to/resource">Resource</a>
 *		<a href="/path/to/thing">Thing</a>
 *	</html>
 *
 *	and the URL = "https://example.com"
 *	
 *	it returns a list with
 *	https://example.com/path/to/resource
 *	https://example.com/path/to/thing
 *	which are the unnormalized URL of the linked resources in the given page
 */


test('test anchor retrieving', () => {
	const html = `<html>
 	<a href="/path/to/resource">Resource</a>
	<a href="/path/to/thing">Thing</a>
</html>`;
	const baseURL = "https://example.com";
	const res = ["https://example.com/path/to/resource", "https://example.com/path/to/thing"];
	expect(getURLsFromHTML(html, baseURL)).toEqual(res);
});

test('test handling of relative and absolute URLs', () => {
	const html = `<html>
    <a href="/relative/path">Relative</a>
    <a href="https://external.com/absolute/path">Absolute</a>
    <a href="https://protocol-relative.com/path">Protocol Relative</a>
    </html>`;
	const baseURL = "https://example.com";
	const expected = [
		"https://example.com/relative/path",
		"https://external.com/absolute/path",
		"https://protocol-relative.com/path"
	];
	expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});

test('test handling of fragment identifiers and query parameters', () => {
	const html = `<html>
    <a href="/page?param1=value1#section1">With Query and Fragment</a>
    <a href="/page#section2">With Fragment</a>
    <a href="/page?param2=value2">With Query</a>
    </html>`;
	const baseURL = "https://example.com";
	const expected = [
		"https://example.com/page?param1=value1#section1",
		"https://example.com/page#section2",
		"https://example.com/page?param2=value2"
	];
	expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});

test('test handling of malformed HTML and edge cases', () => {
	const html = `<html>
    <a href="   /path/with/spaces   ">Spaces</a>
    <a href="">Empty href</a>
    <a>No href attribute</a>
    <a href="javascript:void(0)">JavaScript pseudo-protocol</a>
    <a href="mailto:example@example.com">Mailto</a>
    </html>`;
	const baseURL = "https://example.com";
	const expected = [
		"https://example.com/path/with/spaces",
		"javascript:void(0)",
		"mailto:example@example.com"
	];
	expect(getURLsFromHTML(html, baseURL)).toEqual(expected);
});
