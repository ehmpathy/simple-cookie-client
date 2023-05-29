import { createCache } from 'simple-in-memory-cache';
import { Cookie } from '../domain/Cookie';

const { set, get } = createCache({ defaultSecondsUntilExpiration: Infinity }); // never expire from this cache

/**
 * set a cookie to the in-memory internal cache of "exposed" cookies
 */
export const setInMemoryCookie: (name: string, value: Cookie | null) => void =
  set;

/**
 * get a cookie from the in-memory internal cache of "exposed" cookies
 */
export const getInMemoryCookie = (name: string): Cookie | null => {
  const cachedValue = get(name);
  if (cachedValue) return cachedValue;
  return null; // cast all non-cookies to null, for our use case
};
