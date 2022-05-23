import { startFireFox } from './lib/puppeeter.js';
import scrapper from './bin/scrape.js';
import { url, lastPage } from './url.js';

const ff = await startFireFox();

const currentPage = 1;
(async function recursiveScrape(curPage) {
  const producstList = await scrapper.getProductsList(url, ff, curPage);
  console.log('Total Products on page:', producstList.length);
  for (const p of producstList) {
    const data = await scrapper.getProductInfo(p, ff);
    console.log(data);
  }

  if (curPage <= lastPage) { recursiveScrape(++curPage); }
}(currentPage));
