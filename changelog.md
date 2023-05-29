# Changelog

### [0.3.1](https://www.github.com/ehmpathy/simple-cookie-client/compare/v0.3.0...v0.3.1) (2023-05-29)


### Bug Fixes

* **contract:** remove async custom storage mechanism support ([6a4c52d](https://www.github.com/ehmpathy/simple-cookie-client/commit/6a4c52d891a936fd3fd15cb2b66fbcfd594aa727))
* **deps:** update deps to enable building again ([78eddc2](https://www.github.com/ehmpathy/simple-cookie-client/commit/78eddc2e9d4a46ecd7c97f1da20a54f09b2c23f5))
* **writes:** allow specifying domain of cookie on write ([d933173](https://www.github.com/ehmpathy/simple-cookie-client/commit/d93317352a39dfed8f5d47c8a2c3c53ab81f8bda))
* **writes:** allow specifying path of cookie on write ([ec99325](https://www.github.com/ehmpathy/simple-cookie-client/commit/ec99325934e4bbecb786d45dff1d2e01f339176c))

## [0.3.0](https://www.github.com/ehmpathy/simple-cookie-client/compare/v0.2.1...v0.3.0) (2022-10-06)


### Features

* **parse:** getCookiesFromSetHeader, mergeCookies, getCookiesFromSetHeaderString ([7fe40a3](https://www.github.com/ehmpathy/simple-cookie-client/commit/7fe40a353e58038cea118a39836344b71a2fe230))
* **storage:** support custom storage mechanisms, solving [#3](https://www.github.com/ehmpathy/simple-cookie-client/issues/3) ([17c8362](https://www.github.com/ehmpathy/simple-cookie-client/commit/17c8362e3a12323a03556d2a775efad4d9b7dcf6))


### Bug Fixes

* **exports:** export CookieStorageMechanism type ([1a5898a](https://www.github.com/ehmpathy/simple-cookie-client/commit/1a5898ac8560f08e62c6ff0ad7d178c232828e88))
* **tests:** await getCookie in unit test ([738f48b](https://www.github.com/ehmpathy/simple-cookie-client/commit/738f48b88b7e50876bc1a5a83c52a1d5e67b9a84))
* **tsconfig:** update lib to support .flat() ([ae65ded](https://www.github.com/ehmpathy/simple-cookie-client/commit/ae65dedd2c5395e1c4158a24ad5d69a5dc0f6aa1))

### [0.2.1](https://www.github.com/ehmpathy/simple-cookie-client/compare/v0.2.0...v0.2.1) (2022-10-05)


### Bug Fixes

* **exports:** expose the castCookiesToString method ([e4b6722](https://www.github.com/ehmpathy/simple-cookie-client/commit/e4b6722921b68f5252d9086ff51dea1b94c71b81))

## [0.2.0](https://www.github.com/ehmpathy/simple-cookie-client/compare/v0.1.2...v0.2.0) (2022-10-05)


### Features

* **cicd:** add please-release to cicd; also, upgrade prettier settings ([d802586](https://www.github.com/ehmpathy/simple-cookie-client/commit/d802586ffc47f17761bf0cc87a682c241520e27c))
* **exports:** expose Cookie domain object ([cab40a2](https://www.github.com/ehmpathy/simple-cookie-client/commit/cab40a21299e29180b6924dca69b5d4f970cd830))
* **parse:** add method to cast cookies from string ([35f7a52](https://www.github.com/ehmpathy/simple-cookie-client/commit/35f7a528b9ae27b97db996a2350cd12e80776854))


### Bug Fixes

* **meta:** update github urls from uladkasach to ehmpathy ([93449fd](https://www.github.com/ehmpathy/simple-cookie-client/commit/93449fd32e7a45dcc7d645b2a7438542da6940ea))
