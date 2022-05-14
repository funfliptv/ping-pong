async function getProductsList(url, firefox) {
  // scrapes PDP for PLP links
  const page = await firefox.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(url);
  const list = await page.evaluate(() => [...document.querySelectorAll('.ProductList__GridCol-sc-8lnc8o-0>a')].map((ele) => ele.href));
  return list;
}

async function getProductInfo(url, firefox) {
  const page = await firefox.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(url);
  console.log(await page.content());
}

const scrapper = { getProductsList, getProductInfo };

export default scrapper;
