import { RefObject, useEffect } from 'react';

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void;

const useClickOutside = <T>(
  ref: RefObject<T>,
  handler: ClickOutsideHandler
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current as HTMLElement;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
