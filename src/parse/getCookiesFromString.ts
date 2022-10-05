import { Cookie } from '../domain/Cookie';

export const getCookiesFromString = (cookies: string) => {
  return cookies
    .split(';')
    .map((cookieDef) => {
      const parts = cookieDef.match(/(.*?)=(.*)$/);
      if (!parts) return null;
      return new Cookie({
        name: parts[1].trim(),
        value: parts[2]?.trim() ?? undefined,
      });
    })
    .filter((cookie): cookie is Cookie => !!cookie)
    .reduce(
      (cookieMap, cookie) => ({ ...cookieMap, [cookie.name]: cookie }),
      {} as Record<string, Cookie>,
    );
};
