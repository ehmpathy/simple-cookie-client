# simple-cookie-client

![ci_on_commit](https://github.com/uladkasach/simple-cookie-client/workflows/ci_on_commit/badge.svg)
![deploy_on_tag](https://github.com/uladkasach/simple-cookie-client/workflows/deploy_on_tag/badge.svg)

Simple and isomorphic cookie api, with support for hybrid client-side and server-side rendering applications.

# usage

### install

```sh
npm install simple-cookie-client
```

### get a cookie

```ts
import { getCookie } from 'simple-cookie-client';

const cookie = getCookie({ name: 'authorization' }); // returns `null` or `Cookie`
```

_Supports both browser and server side env._

### set a cookie

```ts
import { setCookie } from 'simple-cookie-client';

setCookie({ name: 'authorization', '821' });
```

_Supports both browser and server side env._

### delete a cookie

```ts
import { deleteCookie } from 'simple-cookie-client';

deleteCookie({ name: 'authorization' });
```

_Supports both browser and server side env._

### parsing out cookies from a cookie header string

```ts
import { getCookiesFromString } from 'simple-cookie-client';

const cookies = getCookiesFromString('authorization=abc; _ga=123') // => [Cookie({ name: 'authorization', value: 'abc'}), Cookie({ name: '_ga', value: '123' })]
expect(cookies.length).toEqual(2);
```

### casting cookies into a cookie header string

```ts
const string = castCookiesToString([
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
