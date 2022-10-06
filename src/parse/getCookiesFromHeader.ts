/* eslint-disable no-nested-ternary */

import { getCookieFromSetCookieHeaderString } from './getCookieFromSetCookieHeaderString';
import { getCookiesFromCookieHeaderString } from './getCookiesFromCookieHeaderString';

export const getCookiesFromHeader = ({
  header: rawHeader,
}: {
  header: Record<string, string | string[] | undefined>;
}) => {
  // normalize header names to lowercase
  const header = Object.fromEntries(
    Object.entries(rawHeader).map(([k, v]) => [k.toLowerCase(), v]),
  );

  // get cookies from set-cookie header strings
  const setCookieHeaderValue = header['set-cookie'];
  const setCookieHeaderStrings = !setCookieHeaderValue
    ? []
    : Array.isArray(setCookieHeaderValue)
    ? setCookieHeaderValue
    : [setCookieHeaderValue];
  const cookiesFromSetCookiesHeader = setCookieHeaderStrings
    .map(getCookieFromSetCookieHeaderString)
    .flat();

  // get cookies from cookie header string
  const cookieHeaderValue = header.cookie;
  const cookieHeaderStrings = !cookieHeaderValue
    ? []
    : Array.isArray(cookieHeaderValue)
    ? cookieHeaderValue
    : [cookieHeaderValue];
  const cookiesFromCookiesHeader = cookieHeaderStrings
    .map(getCookiesFromCookieHeaderString)
    .flat();

  // return all of the cookies
  return [...cookiesFromCookiesHeader, ...cookiesFromSetCookiesHeader];
};
