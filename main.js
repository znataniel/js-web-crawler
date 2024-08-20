import { argv } from 'node:process';
import { crawlPage } from './src/crawl.js';

function main() {
	if (argv.length < 3) {
		throw Error('CLI argument was not provided.');
	}

	if (argv.length > 3) {
		throw Error('More than one CLI argumnt has been provided');
	}

	console.log(`Crawling ${argv[2]}`);
	crawlPage(argv[2]);
}

main();
