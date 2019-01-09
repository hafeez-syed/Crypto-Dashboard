export const toProperCase = stringContent =>
  stringContent.charAt(0).toUpperCase() + stringContent.substr(1);

export const restrictDecimal = stringContent => {
  return +(stringContent + "").slice(0, 7);
};
