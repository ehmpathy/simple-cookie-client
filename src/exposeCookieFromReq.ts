import { getCookiesFromString } from './parse/getCookiesFromString';
import { setExposedCookie } from './stores/exposedCookieStore';

/**
 * extracts the value of a particular cookie from the request object and exposes it so that anyone can 'getCookie' on it, regardless of env
 *
 * used primarily in server-side-rendering (SSR) contexts, where cookies are defined in the `req` object accessible to the ssr server - but not to the `document` where an app would expect it.
 *
 * this supports any SSR implementation that has a req object with a 'cookie' header, but explicitly supports:
 * - Next.JS
 *
 * NOTE: this method needs to be updated to support environments when more than one request is handled in the same context at the same time.
 * - this does _not_ affect lambda (aws-lambda, serverless) environments, those work fine
 */
export const exposeCookieFromReq = ({
  name,
  req,
}: {
  /**
   * the name of the cookie you'd like to expose from the request
   */
  name: string;
  /**
   * the request payload, with headers which contain the cookie
   */
  req: { headers: { cookie?: string } };
}) => {
  // grab the cookie header from the request
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return; // bail here if cookie header was not set

  // parse the cookie header into individual cookies
  const cookies = getCookiesFromString(cookieHeader);

  // find the specific cookie of interest
  const cookieOfInterest = cookies[name];

  // otherwise, expose it it
  setExposedCookie(name, cookieOfInterest ?? null); // save as null if the cookie is not defined in the request, to make sure no shared state between requests
};
