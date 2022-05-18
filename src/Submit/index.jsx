/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 15:22:22
 * @LastEditTime: 2022-05-18 10:37:43
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useParentForm, observer } from '@formily/react';
import { LoadingButton } from '@mui/lab';

const Submit = observer(({
  onSubmit,
  onSubmitFailed,
  onSubmitSuccess,
  resetOnSuccess,
  loading,
  onClick,
  children,
  ...props
}) => {
  const form = useParentForm();
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
  ...LoadingButton.propTypes,
};

Submit.displayName = 'formilyMuiSubmit';

export default Submit;
