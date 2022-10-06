# simple-cookie-client

![ci_on_commit](https://github.com/ehmpathy/simple-cookie-client/workflows/ci_on_commit/badge.svg)
![deploy_on_tag](https://github.com/ehmpathy/simple-cookie-client/workflows/deploy_on_tag/badge.svg)

Simple and isomorphic cookie api, with support for hybrid client-side and server-side rendering applications.

# usage

### install

```sh
npm install simple-cookie-client
```

### get a cookie

this library makes it easy to get a cookie in any environment.

by default, this library checks the following cookie storage mechanisms:
- `document.cookie`, if the `document` global is defined (i.e., in a browser)
- `in-memory cache`, if the `document` global was not defined (e.g., if server-side rendering)

for example
```ts
import { getCookie, Cookie } from 'simple-cookie-client';

const cookie = getCookie({ name: 'authorization' });
expect(cookie).toBeInstanceOf(Cookie);
```

you can also specify that you want to only get cookies from a particular storage mechanism

for example
```ts
import { getCookie, Cookie, CookieStorageMechanism } from 'simple-cookie-client';

const cookieInBrowser = getCookie({
  name: 'authorization',
  storage: { mechanism: CookieStorageMechanism.BROWSER },
});
expect(cookieInBrowser).toBeInstanceOf(Cookie);

const cookieInMemory = getCookie({
  name: 'authorization',
  storage: { mechanism: CookieStorageMechanism.IN_MEMORY },
});
expect(cookieInMemory).toBeInstanceOf(Cookie);
```

you can even specify a custom cookie storage mechanism to use

for example
```ts
import { createCache } from 'simple-on-disk-cache';

const cookieOnDisk = getCookie({
  name: 'authorization',
  storage: {
    mechanism: CookieStorageMechanism.CUSTOM,
    implementation: createCache({
      directory: {
        s3: {
          bucket: '__your_s3_bucket__',
          prefix: 'path/to/cookies'
        }
      },
    })
  }
})
expect(cookieOnDisk).toBeInstanceOf(Cookie);
```

### set a cookie

setting a cookie operates much like getting a cookie, except you also pass in the value.

```ts
import { setCookie } from 'simple-cookie-client';

setCookie({ name: 'authorization', value: '821' }); // note: like with getCookie, you may choose which storage mechanism to use
```

### delete a cookie

same thing with deleting

```ts
import { deleteCookie } from 'simple-cookie-client';

deleteCookie({ name: 'authorization' }); // note: like with getCookie, you may choose which storage mechanism to use
```

### parsing out cookies from a header

if you need to manually deal with headers, on the backend for example, this library exposes a simple utility which is able to extract cookies from any header object.

for example, from a `set-cookie` (case insensitive) header
```ts
import { getCookiesFromHeader } from 'simple-cookie-client';

const header = {
  'set-cookie': [
    'NID=511=stuffstuffstuff-SaX-stuffstuffstuff-stuffstuff-stuffstuffstuff; expires=Thu, 06-Apr-2023 14:37:50 GMT; path=/; domain=.coolstuff.com; HttpOnly',
  ],
};
const cookies = getCookiesFromHeader({ header });
expect(cookies.length).toEqual(1);
expect(cookies[0].name).toEqual('NID');
expect(cookies[0].domain).toEqual('.coolstuff.com');
```

or from a `cookie` (case insensitive) header

```ts
const header = {
  cookie:
    '_ga=123; authorization=opensaysame; __utma=10102256.1994221130.1664978497.1664978497.1664978497.1',
};
const cookies = getCookiesFromHeader({ header });
expect(cookies.length).toEqual(3);
expect(cookies[0].name).toEqual('_ga');
expect(cookies[2].name).toEqual('__utma');
```

### casting cookies into a cookie header string

in case you need to set a cookie header from a list of cookies, this library also exposes a simple way to turn any list of cookies into the header string, compliant with spec.

```ts
import { castCookiesToCookieHeaderString } from 'simple-cookie-client';

const string = castCookiesToCookieHeaderString([
  new Cookie({ name: '_ga', value: '123' }),
  new Cookie({ name: 'authorization', value: 'opensaysame' }),
]);
expect(string).toEqual(
  '_ga=123; authorization=opensaysame;',
);
```

# server side rendering support

In serverside rendering, you may need a cookie that is accessible to your clientside application in the `document` but not in your serverside application context. Typically, the same cookie that is accessible in the browser in the `document` object - is accessible on the server in the `request` object sent to your server.

Therefore, this library supports exposing cookies from the request in a way that is isomorphic (i.e., looks the same) to the clientside code you're writing.

For example, in a Next.JS application, you are able to access the `req` object with `getServerSideProps`. Here is how you can expose the cookie in that environment:

```ts
import { exposeCookieFromReq } from 'simple-cookie-client';

export const getStaticProps = async ({ req }) =>
  exposeCookieFromReq({
    name, // the name of the cookie you want to expose
    req, // the request object next.js was given
  });
```

And now, any code in your stack can access that cookie without needing to think about whether it gets it from the browser directly or whether it was exposed like above:

```ts
const cookie = getCookie({ name }); // this will work both in SSR (if cookie was exposed from req) as well as browser (where cookie is in `document` api)
```
