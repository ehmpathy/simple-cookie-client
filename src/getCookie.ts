import { getExposedCookie } from './stores/exposedCookieStore';
import { getDocumentCookie } from './stores/documentCookieStore';
import { documentIsDefined } from './env/documentIsDefined';

/**
 * gets the cookie from:
 * - the browser, if in browser env, through document api
 * - the in-memory exposed-cookies store, if not in browser env or cookie not stored in document (for SSR support)
 */
export const getCookie = ({ name }: { name: string }) => {
  // if it is defined in the browser, grab it directly from the window.document
  if (documentIsDefined()) {
    const documentCookie = getDocumentCookie(name);
    if (documentCookie) return documentCookie;
  }

  // otherwise, check it it was exposed explicitly outside of window.document (E.g., maybe in SSR env where document is not defined)
  const exposedCookie = getExposedCookie(name);
  if (exposedCookie) return exposedCookie;

  // otherwise, return null
  return null;
};
