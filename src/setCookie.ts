import { serialize } from 'domain-objects';
import { isPresent } from 'type-fns';
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
export const setCookie = ({
  name,
  value,
  domain,
  path = '/',
  storage = { mechanism: CookieStorageMechanism.AUTO },
}: {
  /**
   * the name of the cookie to set
   */
  name: string;

  /**
   * the value of the cookie to set
   */
  value: string;

  /**
   * allow specifying the domain under which to set the cookie
   */
  domain?: string;

  /**
   * allow specifying the path under which to set the cookie
   */
  path?: string;

  /**
   * allow specifying which storage mechanism to use for this operation
   */
  storage?: CookieStorageChoice;
}): void => {
  // set the cookie to browser.document storage, if possible and requested
  if (documentIsDefined() && shouldStoreInBrowser(storage))
    setDocumentCookie(
      name,
      value,
      [
        'expires=Thu, 01 Jan 2100 00:00:00 GMT', // TODO: support expiration times. for now, never expires
        domain ? `Domain=${domain}` : null, // allow specifying the domain
        path ? `Path=${path}` : null, // allow specifying the path
      ]
        .filter(isPresent)
        .join(';'),
    );

  // set the cookie to in-memory storage, if requested
  if (shouldStoreInMemory(storage))
    setInMemoryCookie(name, new Cookie({ name, value }));

  // set the cookie to custom storage, if requested
  if (shouldStoreInCustom(storage))
    storage.implementation.set(name, serialize(new Cookie({ name, value })));
};
