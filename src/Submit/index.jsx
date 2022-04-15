/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 15:22:22
 * @LastEditTime: 2022-04-15 19:59:42
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useParentForm } from '@formily/react';
import { observer } from '@formily/reactive-react';
import { LoadingButton } from '@mui/lab';

const Submit = observer(({
  onSubmit,
  onSubmitFailed,
  onSubmitSuccess,
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
          form.submit(onSubmit).then(onSubmitSuccess).catch(onSubmitFailed);
        }
      }}
    >
      {children}
    </LoadingButton>
  );
});

Submit.defaultProps = {
  children: '提交',
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
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onClick: PropTypes.func,
  ...LoadingButton.propTypes,
};

Submit.displayName = 'formilyMuiSubmit';

export default Submit;
