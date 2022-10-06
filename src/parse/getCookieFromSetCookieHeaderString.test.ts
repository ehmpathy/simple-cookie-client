import { Cookie } from '..';
import { getCookieFromSetCookieHeaderString } from './getCookieFromSetCookieHeaderString';

const exampleHeaderStrings = [
  'NID=511=stuffstuffstuff-SaX-stuffstuffstuff-stuffstuff-stuffstuffstuff; expires=Thu, 06-Apr-2023 14:37:50 GMT; path=/; domain=.coolstuff.com; HttpOnly',
];
describe('getCookieFromSetCookieHeaderString', () => {
  it('should be able to get the cookie with all attributes', () => {
    const cookie = getCookieFromSetCookieHeaderString(exampleHeaderStrings[0]);
    expect(cookie).toEqual(
      new Cookie({
        name: 'NID',
        value:
          '511=stuffstuffstuff-SaX-stuffstuffstuff-stuffstuff-stuffstuffstuff',
        expires: 'Thu, 06-Apr-2023 14:37:50 GMT',
        maxAge: undefined,
        domain: '.coolstuff.com',
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: undefined,
      }),
    );
  });
});
