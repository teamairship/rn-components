import React from 'react';

/**
 * Set a ref to a variable's current value.
 * This is useful for avoiding re-renders or re-triggers when including
 * a variable in a useEffect dependency array.
 *
 * **USAGE:**
 * ```
 * const currentNumberRef = useCurrent(currentNumber);
 * // currentNumberRef is always the same Javascript object,
 * // so this avoids re-triggering the useEffect callback function.
 * useEffect(() => {
 *   console.log(currentNumberRef.current);
 * }, [currentNumberRef]);
 * ```
 */
const useCurrent = <T>(value: T): React.MutableRefObject<T> => {
  const valueRef = React.useRef(value);
  valueRef.current = value;
  return valueRef;
};

export default useCurrent;
