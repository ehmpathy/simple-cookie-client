import { Cookie } from '..';

export const castCookiesArrayToNameToCookieMap = ({
  cookies,
}: {
  cookies: Cookie[];
}) =>
  cookies.reduce(
    (cookieMap, cookie) => ({ ...cookieMap, [cookie.name]: cookie }),
    {} as Record<string, Cookie>,
  );
