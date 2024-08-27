import { argv } from 'node:process';
import { crawlPage } from './src/crawl.js';
import { report } from './src/report.js';

async function main() {
	if (argv.length < 3) {
		console.log('Please provide a website to crawl');
		throw Error('CLI argument was not provided.');
	}

	if (argv.length > 3) {
		console.log('Please provide a website to crawl');
		throw Error('More than one CLI argumnt has been provided');
	}

	console.log(`Crawling ${argv[2]}`);
	const pages = await crawlPage(argv[2]);
	report(pages)
}

main();
