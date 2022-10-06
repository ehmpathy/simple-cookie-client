import { Cookie } from '../domain/Cookie';

/**
 * parses out all cookies defined in a `cookie` header string
 *
 * follows the spec:
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie
 */
export const getCookiesFromCookieHeaderString = (
  cookieHeaderString: string,
): Cookie[] => {
  return cookieHeaderString
    .split(';')
    .map((cookieDef) => {
      const parts = cookieDef.match(/(.*?)=(.*)$/);
      if (!parts) return null;
      return new Cookie({
        name: parts[1].trim(),
        value: parts[2]?.trim() ?? undefined,
      });
    })
    .filter((cookie): cookie is Cookie => !!cookie);
};
