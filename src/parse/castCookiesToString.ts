import { Cookie } from '../domain/Cookie';

export const castCookiesToString = (cookies: Cookie[]) => {
  return cookies.map((cookie) => [cookie.name, cookie.value].join('=')).join('; ');
};
