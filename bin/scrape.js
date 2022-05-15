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
  const info = await page.evaluate(() => {
    const data = {
      id: undefined,
      name: document.querySelector('.Text__StyledText-sc-oo0kvp-0.elstub').innerText,
      slug: window.location.href.split('/')[2],
      permalink: window.location.href,
      date_created: undefined,
      date_created_gmt: undefined,
      date_modified: undefined,
      date_modified_gmt: undefined,
      type: 'simple',
      status: 'draft',
      featured: false,
      catalog_visibility: 'visible',
      description: document.querySelector('.ProductDescription__DetailsCardStyled-sc-1tmqkzf-0').innerHTML,
      short_description: document.querySelector('.Text__StyledText-sc-oo0kvp-0.elstub').innerText,
      sku: '',
      price: document.querySelector('.fyTUEs').innerText.replace('₹', ''),
      regular_price: document.querySelector('.Text__StyledText-sc-oo0kvp-0.bWSOET').innerText.replace('₹', ''),
      sale_price: document.querySelector('.fyTUEs').innerText.replace('₹', ''),
      date_on_sale_from: null,
      date_on_sale_from_gmt: null,
      date_on_sale_to: null,
      date_on_sale_to_gmt: null,
      on_sale: document.querySelector('.Text__StyledText-sc-oo0kvp-0.jENgNp')?.innerText?.includes('off'),
      purchasable: true,
      total_sales: 0,
      virtual: false,
      downloadable: false,
      downloads: [],
      download_limit: -1,
      download_expiry: -1,
      external_url: '',
      button_text: '',
      tax_status: 'taxable',
      tax_class: '',
      manage_stock: true,
      stock_quantity: 100,
      backorders: 'no',
      backorders_allowed: false,
      backordered: false,
      low_stock_amount: null,
      sold_individually: false,
      weight: undefined,
      dimensions: {
        length: undefined,
        width: undefined,
        height: undefined,
      },
      shipping_required: true,
      shipping_taxable: true,
      shipping_class: '',
      shipping_class_id: 0,
      reviews_allowed: true,
      average_rating: '0.00',
      rating_count: 0,
      upsell_ids: [],
      cross_sell_ids: [],
      parent_id: 0,
      purchase_note: '',
      categories: [
        {
          id: undefined,
          name: undefined,
          slug: undefined,
        },
      ],
      tags: [
        {
          id: undefined,
          name: undefined,
          slug: undefined,
        },
      ],
      images: [],
      attributes: [
        {
          id: 5,
          name: 'Color',
          position: 0,
          visible: true,
          variation: false,
          options: [
            'Black',
          ],
        },
      ],
      default_attributes: [],
      variations: [],
      grouped_products: [],
      menu_order: 0,
      price_html: '<del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#8377;</span>899.00</bdi></span></del> <ins><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">&#8377;</span>799.00</bdi></span></ins>',
      related_ids: [],
      meta_data: [
        {
          id: 195,
          key: 'm_price',
          value: '699',
        },
        {
          id: 196,
          key: '_m_price',
          value: 'field_627b4a8b90f69',
        },
        {
          id: 197,
          key: 'cost_price',
          value: '',
        },
        {
          id: 198,
          key: '_cost_price',
          value: 'field_627b490be3180',
        },
      ],
      stock_status: 'instock',
      has_options: false,
      _links: {
        self: [
          {
            href: 'https://wordpress-239898-2621013.cloudwaysapps.com/wp-json/wc/v3/products/28',
          },
        ],
        collection: [
          {
            href: 'https://wordpress-239898-2621013.cloudwaysapps.com/wp-json/wc/v3/products',
          },
        ],
      },
    };
    return data;
  });
  return info;
}

const scrapper = { getProductsList, getProductInfo };

export default scrapper;
