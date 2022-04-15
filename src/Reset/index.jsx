/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 15:22:22
 * @LastEditTime: 2022-04-15 18:24:38
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useParentForm } from '@formily/react';
import { Button } from '@mui/material';

const Reset = ({
  forceClear,
  validate,
  onResetValidateSuccess,
  onResetValidateFailed,
  initial,
  children,
  onClick,
  ...props
}) => {
  const form = useParentForm();
  const onSuccess = (payload) => {
    onResetValidateSuccess?.(payload);
    if (initial) { form?.setValues?.(form?.initialValues); }
  };
  return (
    <Button
      {...{
        variant: 'outlined',
        color: 'secondary',
        ...props,
      }}
      onClick={(e) => {
        if (onClick) {
          if (onClick?.(e) === false) return;
        }
        form
          .reset('*', {
            forceClear,
            validate,
          })
          .then(onSuccess)
          .catch(onResetValidateFailed);
      }}
    >
      {children}
    </Button>
  );
};

Reset.defaultProps = {
  children: '重置',
  initial: true,
};

Reset.propTypes = {
  initial: PropTypes.bool, // 是否为恢复到初始值
  forceClear: PropTypes.bool, // 是否强制清除
  validate: PropTypes.bool, // 是否校验
  children: PropTypes.node,
  onResetValidateSuccess: PropTypes.func,
  onResetValidateFailed: PropTypes.func,
  ...Button.propTypes,
  onClick: PropTypes.func,
};

Reset.displayName = 'formilyMuiReset';

export default Reset;
