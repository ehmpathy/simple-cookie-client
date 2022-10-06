import { Cookie } from '../domain/Cookie';
import { castCookiesToCookieHeaderString } from './castCookiesToCookieHeaderString';

describe('castCookiesToString', () => {
  it('should be able to cast cookies to cookies string', () => {
    const string = castCookiesToCookieHeaderString([
      new Cookie({ name: '_ga', value: '123' }),
      new Cookie({ name: 'authorization', value: 'opensaysame' }),
      new Cookie({
        name: '__utma',
        value: '10102256.1994221130.1664978497.1664978497.1664978497.1',
      }),
    ]);
    expect(string).toEqual(
      '_ga=123; authorization=opensaysame; __utma=10102256.1994221130.1664978497.1664978497.1664978497.1',
    );
  });
});
