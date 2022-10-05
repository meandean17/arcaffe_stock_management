import React, { useEffect } from 'react';

// Hook
function useOnClickOutside<T>(
  ref: React.RefObject<T>,
  handler: (e: MouseEvent) => void
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (
          !ref.current ||
          (ref.current as unknown as HTMLElement).contains(
            event.target as Node | null
          )
        ) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener(
        'touchstart',
        listener as EventListenerOrEventListenerObject
      );
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener(
          'touchstart',
          listener as EventListenerOrEventListenerObject
        );
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

export default useOnClickOutside;