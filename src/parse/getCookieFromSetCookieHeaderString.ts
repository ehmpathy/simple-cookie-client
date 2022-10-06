import { Cookie } from '../domain/Cookie';

export class CouldNotGetCookieFromSetCookieHeaderStringError extends Error {
  constructor({
    setCookieHeaderString,
    reason,
  }: {
    setCookieHeaderString: string;
    reason: string;
  }) {
    super(
      `
could not get cookie from setCookie header string, ${reason}. string.slice(0, 10): ${
        // slice to prevent sensitive data from being logged
        setCookieHeaderString.slice(0, 10)
      }...
    `.trim(),
    );
  }
}

/**
 * parses out a cookie, with full metadata, from a `set-cookie` header string
 *
 * follows the spec:
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 */
export const getCookieFromSetCookieHeaderString = (
  setCookieHeaderString: string,
): Cookie => {
  const [root, ...metadatas] = setCookieHeaderString
    .split(';')
    .map((str) => str.trim());

  // parse out the name + value
  const [_, cookieName, cookieValue] = root.match(/(.*?)=(.*)$/) ?? []; // eslint-disable-line @typescript-eslint/no-unused-vars
  if (!cookieName)
    throw new CouldNotGetCookieFromSetCookieHeaderStringError({
      setCookieHeaderString,
      reason: 'no cookie name found',
    });

  // parse out the metadatas
  const metadataMap = metadatas
    .map((metadata) => {
      const [metadataName, metadataValue, ...rest] = metadata.split('=');
      if (rest.length)
        throw new CouldNotGetCookieFromSetCookieHeaderStringError({
          setCookieHeaderString,
          reason: `too many equals signs on metadata key ${metadataName}`,
        });
      return {
        name: metadataName.toLowerCase(), // lowercase so we can look it up deterministically by name, w/o capitalization concerns
        value: metadataValue ?? 'true',
      };
    })
    .reduce((summary, thisMetadata) => {
      return { ...summary, [thisMetadata.name]: thisMetadata.value };
    }, {} as Record<string, string | undefined>);

  // build up the cookie object
  return new Cookie({
    name: cookieName,
    value: cookieValue,
    expires: metadataMap.expires,
    maxAge: metadataMap['max-age'],
    domain: metadataMap.domain,
    path: metadataMap.path,
    secure: metadataMap.secure === 'true',
    httpOnly: metadataMap.httponly === 'true',
    sameSite: metadataMap.samesite as 'Strict' | 'Lax' | 'None',
  });
};
