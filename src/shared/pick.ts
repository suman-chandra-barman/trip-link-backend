const pick = <T extends Record<string, unknown>, F extends keyof T>(
  query: T,
  searchableFields: F[]
): Partial<T> => {
  const finalQuery: Partial<T> = {};

  for (const field of searchableFields) {
    if (query && Object.hasOwnProperty.call(query, field)) {
      finalQuery[field] = query[field];
    }
  }
  return finalQuery;
};

export default pick;
