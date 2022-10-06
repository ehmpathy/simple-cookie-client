import { Cookie } from '..';
import { castCookiesArrayToNameToCookieMap } from './castCookiesArrayToNameToCookieMap';

/**
 * merge new cookies and old cookies
 * - replaces old cookies with new ones in case of name collisions
 */
export const mergeCookies = ({
  oldCookies,
  newCookies,
}: {
  oldCookies: Cookie[];
  newCookies: Cookie[];
}) => {
  const oldNameToCookieMap = castCookiesArrayToNameToCookieMap({
    cookies: oldCookies,
  });
  const newNameToCookieMap = newCookies.reduce((summary, thisCookie) => {
    return { ...summary, [thisCookie.name]: thisCookie };
  }, oldNameToCookieMap); // start with old name to cookie map, to overwrite names
  return Object.values(newNameToCookieMap);
};
