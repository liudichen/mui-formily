import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * @description  rc-utils useMergedState
 * @param {any} defaultStateValue T | (() => T)
 * @param {{
 *  defaultValue?: any,
 *  value?: any,
 *  onChange?: function,
 *  postState?: function,
 * }} option ? {defaultValue?: T | (() => T); value?: T;onChange?: (value: T, prevValue: T) => void; postState?: (value: T) => T;}
 * @return {*} []
 */
const useControlledState = (defaultStateValue, option) => {
  const { defaultValue, value, onChange, postState } = option || {};
  const [ innerValue, setInnerValue ] = useState(() => {
    if (value !== undefined) {
      return value;
    }
    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function'
        ? (defaultValue)()
        : defaultValue;
    }
    return typeof defaultStateValue === 'function'
      ? (defaultStateValue)()
      : defaultStateValue;
  });
  let mergedValue = value !== undefined ? value : innerValue;
  if (postState) {
    mergedValue = postState(mergedValue);
  }

  // setState
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const triggerChange = useCallback(
    (newValue) => {
      setInnerValue(newValue);
      if (mergedValue !== newValue && onChangeRef.current) {
        onChangeRef.current(newValue, mergedValue);
      }
    },
    [ mergedValue, onChangeRef ]
  );

  // Effect of reset value to `undefined`
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (value === undefined) {
      setInnerValue(value);
    }
  }, [ value ]);

  return [ mergedValue, triggerChange ];
};

export default useControlledState;
