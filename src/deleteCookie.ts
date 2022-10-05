import { documentIsDefined } from './env/documentIsDefined';
import { setDocumentCookie } from './stores/documentCookieStore';
import { setExposedCookie } from './stores/exposedCookieStore';

/**
 * deletes the cookie from:
 * - the browser, if in browser env, through document api
 * - the in-memory exposed-cookies store (for SSR support)
 */
export const deleteCookie = ({ name }: { name: string }) => {
  // delete from the document, if any (NOTE: will not be able to delete HTTPOnly cookies, since js can't access or know about those)
  if (documentIsDefined())
    setDocumentCookie(name, '', 'expires=Thu, 01 Jan 1970 00:00:00 GMT'); // only way to delete it is to expire it

  // delete from the exposed cache, in case it was there
  setExposedCookie(name, null);
};
