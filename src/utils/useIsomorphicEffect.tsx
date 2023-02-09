import { useLayoutEffect, useEffect } from 'react';
/**
 * Usage for SSR compatability
 * ---
 * useLayoutEffect does not work in server as window is not available.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export {useIsomorphicLayoutEffect};