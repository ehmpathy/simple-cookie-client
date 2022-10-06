import { Cookie } from '..';
import { mergeCookies } from './mergeCookies';

describe('mergeCookies', () => {
  it('should overwrite old cookies with new ones', () => {
    const mergedCookies = mergeCookies({
      oldCookies: [
        new Cookie({ name: 'a', value: '1' }),
        new Cookie({ name: 'b', value: '1' }),
      ],
      newCookies: [new Cookie({ name: 'a', value: '2' })],
    });
    expect(mergedCookies).toEqual([
      new Cookie({ name: 'a', value: '2' }),
      new Cookie({ name: 'b', value: '1' }),
    ]);
  });
});
