import { startFireFox } from './lib/puppeeter.js';
import scrapper from './bin/scrape.js';
import { url } from './url.js';

const ff = await startFireFox();
const producstList = await scrapper.getProductsList(url, ff);

scrapper.getProductInfo(producstList[0], ff);
