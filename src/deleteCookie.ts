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
export const deleteCookie = ({
  name,
  domain,
  storage = { mechanism: CookieStorageMechanism.AUTO },
}: {
  /**
   * the name of the cookie to delete
   */
  name: string;

  /**
   * allow specifying the domain under which to delete the cookie
   */
  domain?: string;

  /**
   * allow specifying which storage mechanism to use for this operation
   */
  storage?: CookieStorageChoice;
}): void => {
  // delete the cookie from browser.document storage, if possible and requested
  if (documentIsDefined() && shouldStoreInBrowser(storage))
    setDocumentCookie(
      name,
      '',
      [
        'expires=Thu, 01 Jan 1970 00:00:00 GMT', // only way to delete it is to expire it
        domain ? `Domain=${domain}` : '', // allow specifying the domain
      ].join(';'),
    );

  // delete the cookie from in-memory storage, if requested
  if (shouldStoreInMemory(storage)) setInMemoryCookie(name, null);

  // delete the cookie from custom storage, if requested
  if (shouldStoreInCustom(storage)) storage.implementation.set(name, undefined);
};
