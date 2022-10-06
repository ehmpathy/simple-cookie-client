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

/**
 * reads the cookie from the specified cookie storage mechanism
 *
 * default storage mechanism is `AUTO`
 * - if available, browser.document.cookie
 * - and always, in-memory
 */
export const getCookie = async ({
  name,
  storage = { mechanism: CookieStorageMechanism.AUTO },
}: {
  name: string;
  storage?: CookieStorageChoice;
}) => {
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
    const cookie = await storage.implementation.get(name);
    if (cookie) return cookie;
  }

  // otherwise, return null
  return null;
};
