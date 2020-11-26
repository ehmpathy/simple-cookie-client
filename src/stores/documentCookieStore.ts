import { getCookiesFromString } from '../parse/getCookiesFromString';

const assertDocumentIsDefined = () => {
  if (!document) throw new Error('getDocumentCookie was called in an environment where document is not defined'); // fail fast
};

/**
 * get a cookie from the browser using the native document api
 */
export const getDocumentCookie = (name: string) => {
  assertDocumentIsDefined();
  const cookies = getCookiesFromString(document.cookie);
  if (cookies[name]) return cookies[name];
  return null;
};

/**
 * set a cookie to the browser using the native document api
 */
export const setDocumentCookie = (
  name: string,
  value: string,
  /**
   * options like: expires
   */
  options: string,
) => {
  assertDocumentIsDefined();
  document.cookie = `${name}=${value}; ${options}`;
};
