const filterIt = (terms: string, items: any[]) => {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => {
    const values = Object.values(item);
    const stringfiedValues = JSON.stringify(values).toLowerCase();
    return stringfiedValues.match(terms);
  });
};
export default filterIt;
