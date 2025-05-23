

export const appendQueryParams = (params) => {
  let authurisedParams = { ...params };

  
  let queryParams = Object.entries(authurisedParams)
    .filter(([key, value]) => key && value)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return queryParams ? `?${queryParams}` : "";
};
