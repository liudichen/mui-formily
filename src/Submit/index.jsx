/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 15:22:22
 * @LastEditTime: 2022-08-08 10:11:35
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useMemoizedFn, useKeyPress, useCreation } from 'ahooks';
import { useParentForm, observer } from '@formily/react';
import { LoadingButton } from '@mui/lab';

const Submit = observer(({
  onSubmit,
  onSubmitFailed,
  onSubmitSuccess,
  resetOnSuccess,
  enterKeySubmit,
  loading,
  onClick,
  children,
  keyPressEvents,
  keyPressTarget,
  keyPressExactMatch,
  ...props
}) => {
  const form = useParentForm();
  const autoSubmit = useMemoizedFn(() => {
    if (!enterKeySubmit) { return; }
    if (onClick) {
      if (onClick?.() === false) return;
    }
    if (onSubmit) {
      form.submit(onSubmit).then((res) => {
        onSubmitSuccess?.(res);
        if (resetOnSuccess && res === true) {
          form?.reset('*');
        }
      }).catch(onSubmitFailed);
    }
  });
  const options = useCreation(() => {
    if (!keyPressEvents && !keyPressTarget && typeof keyPressExactMatch !== 'boolean') return undefined;
    const Op = {};
    if (keyPressEvents) Op.envents = keyPressEvents;
    if (typeof keyPressExactMatch === 'boolean') Op.exactMatch = keyPressExactMatch;
    if ([ 'number', 'string' ].includes(typeof keyPressTarget)) {
      Op.target = () => document.getElementById(keyPressTarget);
    } else if ([ 'object', 'function' ].includes(typeof keyPressTarget)) {
      Op.target = keyPressTarget;
    }
    return Op;
  }, [ keyPressEvents, keyPressTarget, keyPressExactMatch ]);
  useKeyPress('enter', () => autoSubmit(), options);
  return (
    <LoadingButton
      {...{
        variant: 'contained',
        ...props,
      }}
      loading={loading ?? form.submitting}
      onClick={(e) => {
        if (onClick) {
          if (onClick?.(e) === false) return;
        }
        if (onSubmit) {
          form.submit(onSubmit).then((res) => {
            onSubmitSuccess?.(res);
            if (resetOnSuccess && res === true) {
              form?.reset('*');
            }
          }).catch(onSubmitFailed);
        }
      }}
    >
      {children}
    </LoadingButton>
  );
});

Submit.defaultProps = {
  children: '提交',
  resetOnSuccess: true,
  onSubmitSuccess: () => {},
  onSubmitFailed: (error) => { console.log(error); },
  // loadingIndicator: (
  //   <Stack direction='row' alignItems='center' spacing={2}>
  //     <CircularProgress
  //       size={16}
  //     />
  //     <span>
  //       提交中
  //     </span>
  //   </Stack>
  // ),
};

Submit.propTypes = {
  resetOnSuccess: PropTypes.bool,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onClick: PropTypes.func,
  enterKeySubmit: PropTypes.bool,
  keyPressTarget: PropTypes.any,
  keyPressEvents: PropTypes.array,
  keyPressExactMatch: PropTypes.bool,
  ...LoadingButton.propTypes,
};

Submit.displayName = 'formilyMuiSubmit';

export default Submit;
