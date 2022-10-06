import { Cookie } from '../domain/Cookie';

export const castCookiesToCookieHeaderString = (cookies: Cookie[]) => {
  return cookies
    .map((cookie) => [cookie.name, cookie.value].join('='))
    .join('; ');
};
