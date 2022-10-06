import { DomainValueObject } from 'domain-objects';

/**
 * an http cookie
 *
 * ref:
 * - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 */
export interface Cookie {
  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > A <cookie-name> can contain any US-ASCII characters except for: the control character, space, or a tab. It also must not contain separator characters like the following: ( ) < > @ , ; : \ " / [ ] ? = { }.
   */
  name: string;

  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > A <cookie-value> can optionally be wrapped in double quotes and include any US-ASCII character excluding a control character, Whitespace, double quotes, comma, semicolon, and backslash.
   */
  value: string;

  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > Indicates the maximum lifetime of the cookie as an HTTP-date timestamp. See Date for the required formatting.
   *
   * > If unspecified, the cookie becomes a session cookie. A session finishes when the client shuts down, after which the session cookie is removed.
   *
   * > Warning: Many web browsers have a session restore feature that will save all tabs and restore them the next time the browser is used. Session cookies will also be restored, as if the browser was never closed.
   *
   * > When an Expires date is set, the deadline is relative to the client the cookie is being set on, not the server.
   *
   */
  expires?: string;

  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > Indicates the number of seconds until the cookie expires. A zero or negative number will expire the cookie immediately. If both Expires and Max-Age are set, Max-Age has precedence.
   */
  maxAge?: string;

  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > Defines the host to which the cookie will be sent.
   *
   * > If omitted, this attribute defaults to the host of the current document URL, not including subdomains.
   *
   * > Contrary to earlier specifications, leading dots in domain names (.example.com) are ignored.
   *
   * > Multiple host/domain values are not allowed, but if a domain is specified, then subdomains are always included.
   */
  domain?: string;

  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > Indicates the path that must exist in the requested URL for the browser to send the Cookie header.
   *
   * > The forward slash (/) character is interpreted as a directory separator, and subdirectories are matched as well. For example, for Path=/docs,
   * >  - the request paths /docs, /docs/, /docs/Web/, and /docs/Web/HTTP will all match.
   * >  - the request paths /, /docsets, /fr/docs will not match.
   */
  path?: string;

  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > Indicates that the cookie is sent to the server only when a request is made with the https: scheme (except on localhost), and therefore, is more resistant to man-in-the-middle attacks.
   */
  secure?: boolean;

  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > Forbids JavaScript from accessing the cookie, for example, through the Document.cookie property. Note that a cookie that has been created with HttpOnly will still be sent with JavaScript-initiated requests, for example, when calling XMLHttpRequest.send() or fetch(). This mitigates attacks against cross-site scripting (XSS).
   */
  httpOnly?: boolean;

  /**
   * per https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   * > Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks (CSRF).
   *
   * > The possible attribute values are:
   * > - Strict
   * >    - means that the browser sends the cookie only for same-site requests, that is, requests originating from the same site that set the cookie. If a request originates from a different domain or scheme (even with the same domain), no cookies with the SameSite=Strict attribute are sent.
   * >  - Lax
   * >    - means that the cookie is not sent on cross-site requests, such as on requests to load images or frames, but is sent when a user is navigating to the origin site from an external site (for example, when following a link). This is the default behavior if the SameSite attribute is not specified.
   * >  - None
   * >    - means that the browser sends the cookie with both cross-site and same-site requests. The Secure attribute must also be set when setting this value, like so SameSite=None; Secure
   */
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export class Cookie extends DomainValueObject<Cookie> implements Cookie {}
