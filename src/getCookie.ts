import { deserialize } from 'domain-objects';
import { getDocumentCookie } from './stores/documentCookieStore';
import { documentIsDefined } from './env/documentIsDefined';
import {
  CookieStorageChoice,
  CookieStorageMechanism,
  shouldStoreInBrowser,
  shouldStoreInCustom,
  shouldStoreInMemory,
} from './stores/storageMechanismSelection';
import { getInMemoryCookie } from './stores/inMemoryCookieStore';
import { Cookie } from './domain/Cookie';

/**
 * reads the cookie from the specified cookie storage mechanism
 *
 * default storage mechanism is `AUTO`
 * - if available, browser.document.cookie
 * - and always, in-memory
 */
export const getCookie = ({
  name,
  storage = { mechanism: CookieStorageMechanism.AUTO },
}: {
  name: string;
  storage?: CookieStorageChoice;
}): Cookie | null => {
  // get the cookie from browser.document storage, if possible and requested
  if (documentIsDefined() && shouldStoreInBrowser(storage)) {
    const cookie = getDocumentCookie(name);
    if (cookie) return cookie;
  }

  // get the cookie from memory, if requested
  if (shouldStoreInMemory(storage)) {
    const cookie = getInMemoryCookie(name);
    if (cookie) return cookie;
  }

  // get the cookie from custom storage mechanism, if requested
  if (shouldStoreInCustom(storage)) {
    const cookieSerialized = storage.implementation.get(name);
    if (cookieSerialized)
      return deserialize<Cookie>(cookieSerialized, { with: [Cookie] });
  }

  // otherwise, return null
  return null;
};
