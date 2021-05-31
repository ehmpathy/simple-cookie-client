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
 * this method only supports environments where at most one request is being evaluated at a time per `runtime-context`.
 * - this is because it uses a shared in-memory cache for the environment
 * - this supports serverless environments like aws-lambda, since lambdas may reuse-containers but never at the same time
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
}): void => {
  // grab the cookie header from the request
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return setExposedCookie(name, null); // cookie is null if no cookies were defined

  // parse the cookie header into individual cookies
  const cookies = getCookiesFromString(cookieHeader);

  // find the specific cookie of interest
  const cookieOfInterest = cookies[name];
  if (!cookieOfInterest) return setExposedCookie(name, null); // cookie is null if it wasn't defined

  // otherwise, expose it it
  return setExposedCookie(name, cookieOfInterest);
};
