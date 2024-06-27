// only need translate content, this code elimate other attributes to reduce bundle size
const filterKeys = [
  'title',
  'subtitle',
  'description',
  'text',
  'name',
  'cardcontent',
  'pricerange',
  'landscape',
  'activities',
  'specialoffer',
  'datanotification',
  'pricecontent',
  'min',
  'max'
];

const checkKey = (key) => {
  if (key === 'alternativeText') {
    return false;
  }
  let result = false;
  filterKeys.forEach((filterKey) => {
    if (key.toLocaleLowerCase().indexOf(filterKey) >= 0) {
      result = true;
    }
  });
  return result;
};

function clearEmpties(o) {
  for (var k in o) {
    if (!o[k] || typeof o[k] !== 'object') {
      continue; // If null or not an object, skip to the next iteration
    }
    // The property is an object
    clearEmpties(o[k]); // <-- Make a recursive call on the nested object
    if (Object.keys(o[k]).length === 0) {
      delete o[k]; // The object had no properties, so delete that property
    }
  }
  return o;
}

const deepFilter = (obj) => {
  //iterate the object
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (!val || val === true || val === false || !isNaN(val)) {
      delete obj[key];
    } else if (typeof val === 'object' && key.toLocaleLowerCase() !== 'checklist') {
      // keep checklist array
      deepFilter(val);
    } else {
      if (
        (checkKey(key) === false ||
          val.indexOf('.jpg') > 0 ||
          val.indexOf('.png') > 0 ||
          val.indexOf('.svg') > 0) &&
        key.toLocaleLowerCase() !== 'checklist'
      ) {
        delete obj[key];
      }
    }
  });
};

// append specific fields to attributes object
const changeLanguague = (original, translate) => {
  //iterate the object
  Object.keys(original).forEach((key) => {
    const val = original[key];
    const translateVal = translate[key];
    if (val && translateVal && typeof val === 'object' && key.toLocaleLowerCase() !== 'checklist') {
      // translate checklist array
      changeLanguague(val, translateVal);
    } else {
      if ((translateVal && checkKey(key) === true) || key.toLocaleLowerCase() === 'checklist') {
        original[key] = translateVal;
      }
    }
  });
};

module.exports = {
  deepFilter,
  changeLanguague,
  clearEmpties,
};
