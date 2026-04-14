import { isJohnMurstonTakeoverSearch } from './SearchFeed';

describe('isJohnMurstonTakeoverSearch', () => {
  it('matches john murston exactly after normalization', () => {
    expect(isJohnMurstonTakeoverSearch('john murston')).toBe(true);
    expect(isJohnMurstonTakeoverSearch('  JoHn    murston  ')).toBe(true);
  });

  it('treats jack murston as an exception', () => {
    expect(isJohnMurstonTakeoverSearch('jack murston')).toBe(false);
    expect(isJohnMurstonTakeoverSearch('   JACK   murston   ')).toBe(false);
  });

  it('does not trigger takeover for unrelated searches', () => {
    expect(isJohnMurstonTakeoverSearch('deltarune')).toBe(false);
  });
});
