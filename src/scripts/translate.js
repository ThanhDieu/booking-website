const { updateTranslation, writeXPathList } = require('../../i18n/updateTranslation');
const { deepFilter, clearEmpties } = require('../util/translations');

// fetch translation data from strapi and write to i18n translation file
const CMS_PATH = 'https://cms.bookinghms.com/api';

async function fetchLocales() {
  const response = await fetch(CMS_PATH + '/i18n/locales');
  return response.json();
}

async function fetchFrontPage(localeCode) {
  const response = await fetch(
    CMS_PATH + '/landing-page?populate=deep' + (localeCode ? `&locale=${localeCode}` : '')
  );
  return response.json();
}

async function fetchProperties() {
  const response = await fetch(CMS_PATH + '/properties');
  const data = await response.json();
  return (data?.data || [])?.map((ele) => ({ hotelId: ele.attributes.code }));
}

async function fetchContact(localeCode) {
  const res = await fetch(CMS_PATH + `/pages?populate=deep` + (localeCode ? `&locale=${localeCode}` : ''))
  const result = await res.json();
  return result?.data.filter((ele) => ele.attributes.slug === 'contact')?.map((i) => i.attributes)[0];
}

async function fetchProperty(hotelId, localeCode) {
  const response = await fetch(
    CMS_PATH +
    `/property-pages?populate=deep` +
    (localeCode ? `&locale=${localeCode}` : '')
  );
  const result = await response.json();
  return result.data?.find((property) => property?.attributes?.property?.data?.attributes?.code === hotelId);
}

async function fetchAboutPage(localeCode) {
  const response = await fetch(
    CMS_PATH + `/about-page?populate=deep` + (localeCode ? `&locale=${localeCode}` : '')
  );
  return response.json();
}

async function main() {
  const locales = await fetchLocales();
  // front page
  const data = await fetchFrontPage();
  locales.forEach(async (locale) => {
    let localeData;
    try {
      localeData = await fetchFrontPage(locale.code);
      if (!localeData.data) {
        localeData = data;
      }
    } catch (error) {
      localeData = data;
    }
    const translate = JSON.parse(JSON.stringify(localeData?.data?.attributes));
    deepFilter(translate);
    clearEmpties(translate);
    updateTranslation(locale.code, 'frontPage', translate);
  });

  const contact = await fetchContact();
  locales.forEach(async (locale) => {
    let localeData;
    try {
      localeData = await fetchContact(locale.code);
      if (!localeData.data) {
        localeData = contact;
      }
    } catch (err) {
      localeData = contact;
    }

    const translate = JSON.parse(JSON.stringify(localeData));
    deepFilter(translate);
    clearEmpties(translate);
    updateTranslation(locale.code, 'contactPage', translate);
  })

  // property page
  const paths = await fetchProperties();
  for (const hotelId of paths) {
    const data = await fetchProperty(hotelId.hotelId, "de");
    if (data) {
      locales.forEach(async (locale) => {
        let localeData;
        try {
          localeData = await fetchProperty(hotelId.hotelId, locale.code);
          if (!localeData) {
            localeData = data;
          }
        } catch (error) {
          localeData = data;
        }
        const translate = JSON.parse(JSON.stringify(localeData?.attributes));
        deepFilter(translate);
        clearEmpties(translate);
        updateTranslation(locale.code, String(hotelId.hotelId), { attributes: translate });
      });
    }
  }

  // about page
  const about = await fetchAboutPage();
  locales.forEach(async (locale) => {
    let aboutData;
    try {
      aboutData = await fetchAboutPage(locale.code);
      if (!aboutData.data) {
        aboutData = about;
      }
    } catch (error) {
      aboutData = about;
    }
    const translate = JSON.parse(JSON.stringify(aboutData?.data?.attributes));
    deepFilter(translate);
    clearEmpties(translate);
    updateTranslation(locale.code, 'aboutPage', translate);
  });

  // ************** USE WITH LOCALE TABLE IN CMS **************
  function transform(data, type) {
    switch (type) {
      case "entries":
        return data.data.attributes.entries.map(entry => {
          let obj = {};
          obj[entry.name] = entry.value;
          return obj;
        });

      case "list":
        return data.data.map(item => {
          let obj = {};
          obj[item.attributes.name] = item.id;
          return obj;
        });
      case "locales":
        return data?.data?.attributes?.localizations?.data?.map(locale => {
          return ({
            locale: locale.attributes.locale,
            id: locale.id
          })
        })

      default:
        console.log("Unsupported type");
        return [];
    }
  }

  async function fetchData(url, type) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        res = transform(data, type);
        return res;
      })
      .catch(error => {
        console.log('There was a problem with the fetch operation:', error.message);
        return {};
      });
  }

  const writeDataToJSON = (data, locale) => {
    return data.forEach(key => updateTranslation(locale, Object.keys(key)[0], key[Object.keys(key)[0]]));
  }

  const localeTable = "https://cms.bookinghms.com/api/locale-tables";
  const tables = await fetchData(localeTable, "list");

  async function writeTableDataToJSON(tableName) {
    const tableIndex = tables?.length && tables.findIndex(table => Object.keys(table)[0] === tableName);
    const tableId = tables[tableIndex][tableName];

    const translationsDefault = await fetchData(`${localeTable}/${tableId}?populate=deep`, "entries");
    writeDataToJSON(translationsDefault, 'de');
    // fecth for other locales
    const localeIds = await fetchData(`${localeTable}/${tableId}?populate=deep`, "locales");
    for (const localeId of localeIds) {
      let translations = await fetchData(`${localeTable}/${localeId.id}?populate=deep`, "entries");
      if (!Array.isArray(translations)) {
        translations = translationsDefault;
      }
      writeDataToJSON(translations, localeId.locale);
    };
  }

  await writeTableDataToJSON('ibe_translation');
  await writeTableDataToJSON('frontpage_translation_post');
  await writeTableDataToJSON('ibe_translation_post');

  const postTables = ['frontpage_translation_post', 'ibe_translation_post'];
  let xPathList = [];
  for (const postTable of postTables) {
    const tableIndex = tables?.length && tables.findIndex(table => Object.keys(table)[0] === postTable);
    if (tableIndex >= 0) {
      const tableId = tables[tableIndex][postTable];
      const keys = await fetchData(`${localeTable}/${tableId}?populate=deep`, "entries");
      keys.forEach(key => {
        xPathList.push(Object.keys(key)[0]);
      });
    }
  }

  await writeXPathList(xPathList);
}

(async () => {
  await main();
})().catch((err) => {
  console.error(err);
  throw err;
});
