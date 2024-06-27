const fs = require('fs');
const path = require('path');

const updateTranslation = (locale, key, data) => {
  const localePath = path.join(__dirname, `translations.${locale}.json`);
  if (fs.existsSync(localePath)) {
    const rawdata = fs.readFileSync(localePath, 'utf8');
    let keysOpt = rawdata;
    keysOpt = JSON.parse(keysOpt);

    // @ts-ignore
    keysOpt[key] = data;
    fs.writeFileSync(localePath, JSON.stringify(keysOpt));
  }
};

async function writeXPathList(xPathList) {
  const pathName = path.join(__dirname, `xTranslationList.json`);
  fs.writeFileSync(pathName, JSON.stringify(xPathList));
}

module.exports = {
  updateTranslation,
  writeXPathList,
};
