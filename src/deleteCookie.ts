import { documentIsDefined } from './env/documentIsDefined';
import { setDocumentCookie } from './stores/documentCookieStore';
import { setInMemoryCookie } from './stores/inMemoryCookieStore';
import {
  CookieStorageMechanism,
  CookieStorageChoice,
  shouldStoreInBrowser,
  shouldStoreInMemory,
  shouldStoreInCustom,
} from './stores/storageMechanismSelection';

/**
 * deletes the cookie from:
 * - the browser, if in browser env, through document api
 * - the in-memory exposed-cookies store (for SSR support)
 */
export const deleteCookie = async ({
  name,
  storage = { mechanism: CookieStorageMechanism.AUTO },
}: {
  name: string;
  storage?: CookieStorageChoice;
}) => {
  // delete the cookie from browser.document storage, if possible and requested
  if (documentIsDefined() && shouldStoreInBrowser(storage))
    setDocumentCookie(name, '', 'expires=Thu, 01 Jan 1970 00:00:00 GMT'); // only way to delete it is to expire it

  // delete the cookie from in-memory storage, if requested
  if (shouldStoreInMemory(storage)) setInMemoryCookie(name, null);

  // delete the cookie from custom storage, if requested
  if (shouldStoreInCustom(storage))
    await storage.implementation.set(name, undefined);
};
