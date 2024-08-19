import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

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
