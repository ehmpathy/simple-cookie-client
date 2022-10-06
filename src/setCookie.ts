import { serialize } from 'domain-objects';
import { documentIsDefined } from './env/documentIsDefined';
import { setDocumentCookie } from './stores/documentCookieStore';
import { setInMemoryCookie } from './stores/inMemoryCookieStore';
import { Cookie } from './domain/Cookie';
import {
  CookieStorageMechanism,
  CookieStorageChoice,
  shouldStoreInBrowser,
  shouldStoreInCustom,
  shouldStoreInMemory,
} from './stores/storageMechanismSelection';

/**
 * saves the cookie to the specified cookie storage mechanism
 *
 * default storage mechanism is `AUTO`
 * - if available, browser.document.cookie
 * - and always, in-memory
 */
export const setCookie = async ({
  name,
  value,
  storage = { mechanism: CookieStorageMechanism.AUTO },
}: {
  name: string;
  value: string;
  storage?: CookieStorageChoice;
}) => {
  // set the cookie to browser.document storage, if possible and requested
  if (documentIsDefined() && shouldStoreInBrowser(storage))
    setDocumentCookie(name, value, 'expires=Thu, 01 Jan 2100 00:00:00 GMT'); // TODO: support expiration times. for now, never expires

  // set the cookie to in-memory storage, if requested
  if (shouldStoreInMemory(storage))
    setInMemoryCookie(name, new Cookie({ name, value }));

  // set the cookie to custom storage, if requested
  if (shouldStoreInCustom(storage))
    await storage.implementation.set(
      name,
      serialize(new Cookie({ name, value })),
    );
};
