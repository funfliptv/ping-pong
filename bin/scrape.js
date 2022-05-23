async function getProductsList(url, firefox, pageNo) {
  // scrapes PDP for PLP links
  const realUrl = `${url}&page=${pageNo}`;
  console.log('navigating to ', realUrl);
  const page = await firefox.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(realUrl);
  const list = await page.evaluate(() => [...document.querySelectorAll('.ProductList__GridCol-sc-8lnc8o-0>a')].map((ele) => ele.href));
  return list;
}

async function getProductInfo(url, firefox) {
  console.log('PDP:', url);
  const page = await firefox.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(url);
  const info = await page.evaluate(() => {
    const productType = [...document.querySelectorAll('.Chipsstyled__ChipsWrapper-sc-id03eo-0 span')].length > 1 ? 'variable' : 'simple';
    const images = [...document.querySelectorAll('.Slider__SliderList-sc-xkrsbz-1 img')].filter((i) => i.src.includes('http')).map((i) => ({ src: i.src.replace('64', '512') }));

    const productId = images[0].src.split('images.meesho.com/images/products/')[1].split('/')[0];

    const useImages = images.filter(({ src }) => src.includes(productId));
    const data = {
      regular_price: document.querySelector('.Text__StyledText-sc-oo0kvp-0.bWSOET').innerText.replace('₹', ''),
      type: productType,
      variation: productType === 'varibale' ? true : 'simple',
      status: 'draft',
      stock_status: 'instock',
      description: document.querySelector('.ProductDescription__DetailsCardStyled-sc-1tmqkzf-0').innerHTML,

      categories: [{ id: 1 }],
      sku: `78${productId}79`,
      images: useImages,
      attributes: [...(new Set([...document.querySelectorAll('.Chipsstyled__ChipsWrapper-sc-id03eo-0 span')].map((e) => (e.innerText))))].map((txt) => ({ id: 5, options: txt })),

      meta_data: [
        {
          id: 164,
          key: 'cost_price',
          value: document.querySelector('.Text__StyledText-sc-oo0kvp-0.bWSOET').innerText.replace('₹', ''),
        },
        {
          id: 5,
          key: 'm_price',
          value: document.querySelector('.Text__StyledText-sc-oo0kvp-0.bWSOET').innerText.replace('₹', ''),
        },

      ],

    };
    return data;
  });
  return info;
}

const scrapper = { getProductsList, getProductInfo };

export default scrapper;
