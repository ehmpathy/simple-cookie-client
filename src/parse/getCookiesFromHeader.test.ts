import { getCookiesFromHeader } from './getCookiesFromHeader';

describe('getCookiesFromHeader', () => {
  it('should be able to get cookies from set-cookie header', () => {
    const header = {
      'set-cookie': [
        'NID=511=stuffstuffstuff-SaX-stuffstuffstuff-stuffstuff-stuffstuffstuff; expires=Thu, 06-Apr-2023 14:37:50 GMT; path=/; domain=.coolstuff.com; HttpOnly',
      ],
    };
    const cookies = getCookiesFromHeader({ header });
    expect(cookies.length).toEqual(1);
    expect(cookies[0].name).toEqual('NID');
    expect(cookies[0].domain).toEqual('.coolstuff.com');
  });
  it('should be able to get cookies from cookie header', () => {
    const header = {
      cookie:
        '_ga=123; authorization=opensaysame; __utma=10102256.1994221130.1664978497.1664978497.1664978497.1',
    };
    const cookies = getCookiesFromHeader({ header });
    expect(cookies.length).toEqual(3);
    expect(cookies[0].name).toEqual('_ga');
    expect(cookies[2].name).toEqual('__utma');
  });
});
