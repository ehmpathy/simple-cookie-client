import { Cookie } from './domain/Cookie';
import { getCookie } from './getCookie';
import { getDocumentCookie } from './stores/documentCookieStore';
import { getExposedCookie } from './stores/exposedCookieStore';

jest.mock('./stores/documentCookieStore');
const getDocumentCookieMock = getDocumentCookie as jest.Mock;
jest.mock('./stores/exposedCookieStore');
const getExposedCookieMock = getExposedCookie as jest.Mock;

describe('getCookie', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should get the cookie from the document store, if its defined in the document store', () => {
    // mock the cookie is defined
    const cookieToFind = new Cookie({ name: 'authorization', value: '821' });
    getDocumentCookieMock.mockReturnValueOnce(cookieToFind); // mock that it is exposed

    // get the cookie
    const cookie = getCookie({ name: 'authorization' });

    // check expected results
    expect(cookie).toEqual(cookieToFind);
    expect(getDocumentCookieMock).toHaveBeenCalledTimes(1);
    expect(getExposedCookieMock).not.toHaveBeenCalled();
  });
  it('should get the cookie from the exposed store, if it is not in the document store and is in the exposed store', () => {
    // mock the cookie is defined
    const cookieToFind = new Cookie({ name: 'authorization', value: '821' });
    getDocumentCookieMock.mockReturnValueOnce(null);
    getExposedCookieMock.mockReturnValueOnce(cookieToFind);

    // get the cookie
    const cookie = getCookie({ name: 'authorization' });

    // check expected results
    expect(cookie).toEqual(cookieToFind);
    expect(getDocumentCookieMock).toHaveBeenCalledTimes(1);
    expect(getExposedCookieMock).toHaveBeenCalledTimes(1);
  });
  it('should gracefully return null if cookie is not found in either store', () => {
    // mock the cookie is not defined
    getDocumentCookieMock.mockReturnValueOnce(null);
    getExposedCookieMock.mockReturnValueOnce(null);

    // get the cookie
    const cookie = getCookie({ name: 'authorization' });

    // check expected results
    expect(cookie).toEqual(null);
    expect(getDocumentCookieMock).toHaveBeenCalledTimes(1);
    expect(getExposedCookieMock).toHaveBeenCalledTimes(1);
  });
});
