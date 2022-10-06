/**
 * a mechanism in which you can store cookies, supporting CRUD operations
 */
export enum CookieStorageMechanism {
  /**
   * AUTO means use the browser's document store if present, and if not, use a global in-memory storage
   */
  AUTO = 'AUTO',

  /**
   * the BROWSER option specifies to store cookies in the browser's document cookie storage
   *
   * ref:
   * - https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
   */
  BROWSER = 'BROWSER',

  /**
   * the IN_MEMORY option specifies to store the cookies in an in-memory storage mechanism
   *
   * relevance
   * - this method is crucial to server-side-rendering application in which the browser's document cookie store is not available
   */
  IN_MEMORY = 'IN_MEMORY',

  /**
   * the CUSTOM option specifies that you would like to provide a custom storage mechaism
   *
   * relevance
   * - this may be useful if you'd like to persist cookies to disk
   * - for example, if you are trying to mimic how a browser interacts with an api
   */
  CUSTOM = 'CUSTOM',
}

export interface CustomCookieStorageMechanismImplementation {
  get: (key: string) => Promise<string>;
  set: (key: string, value: string | undefined) => Promise<void>;
}

export type CookieStorageChoice =
  | {
      mechanism:
        | CookieStorageMechanism.AUTO
        | CookieStorageMechanism.BROWSER
        | CookieStorageMechanism.IN_MEMORY;
    }
  | {
      mechanism: CookieStorageMechanism.CUSTOM;
      implementation: CustomCookieStorageMechanismImplementation;
    };

export const shouldStoreInBrowser = (
  choice: CookieStorageChoice,
): choice is {
  mechanism: CookieStorageMechanism.AUTO | CookieStorageMechanism.BROWSER;
} =>
  [CookieStorageMechanism.AUTO, CookieStorageMechanism.BROWSER].includes(
    choice.mechanism,
  );

export const shouldStoreInMemory = (
  choice: CookieStorageChoice,
): choice is {
  mechanism: CookieStorageMechanism.AUTO | CookieStorageMechanism.IN_MEMORY;
} =>
  [CookieStorageMechanism.AUTO, CookieStorageMechanism.IN_MEMORY].includes(
    choice.mechanism,
  );

export const shouldStoreInCustom = (
  choice: CookieStorageChoice,
): choice is {
  mechanism: CookieStorageMechanism.CUSTOM;
  implementation: CustomCookieStorageMechanismImplementation;
} => [CookieStorageMechanism.CUSTOM].includes(choice.mechanism);
