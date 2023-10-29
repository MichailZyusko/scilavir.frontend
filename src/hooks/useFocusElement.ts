import {
  Dispatch,
  RefObject, SetStateAction, useEffect, useState,
} from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useFocusElement(ref: RefObject<any>) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsFocused(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return [isFocused, setIsFocused] as [boolean, Dispatch<SetStateAction<boolean>>];
}
