/* eslint-disable no-unused-vars */
/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-04 20:15:19
 * @LastEditTime: 2022-04-15 19:49:56
 */
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link } from '@mui/material';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import CloseIcon from '@mui/icons-material/Close';

// import Space from '@/components/Space';
import Reset from '../Reset';
import Submit from '../Submit';
import { sx, dialog } from './propTypes';

const ModalForm = (props) => {
  const {
    trigger, title, titleProps, contentProps, actionsProps, onClose: onCloseProps,
    dialongProps, sx, maxWidth, fullWidth, fullScreen,
    children,
    showClose, showReset, showSubmit,
    submitText, resetText, submitProps, resetProps,
    onFinish, destroyOnClose,
  } = props;
  const [ open, setOpen ] = useState(false);
  const form = useMemo(() => createForm({ validateFirst: true }), []);
  const onClose = useMemoizedFn(() => {
    onCloseProps?.();
    setOpen(false);
  });
  const onSubmit = useMemoizedFn(async (values) => {
    const res = await onFinish(values);
    if (res === true) {
      onClose();
      if (destroyOnClose) {
        form?.reset();
      }
    }
  });
  return (
    <>
      <Link
        onClick={() => setOpen(true)}
        underline='none'
        sx={{ cursor: 'pointer' }}
      >
        {trigger}
      </Link>
      <Dialog
        {...{
          ...(dialongProps || {}),
          open,
          onClose,
          fullScreen,
          fullWidth,
          maxWidth,
          sx,
        }}
      >
        <FormProvider form={form}>
          <DialogTitle {...{ ...(titleProps || {}), sx: { fontSize: '16px', ...(titleProps?.sx || {}) } }}>
            {title}
            { showClose && (
              <IconButton
                aria-label='close'
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </DialogTitle>
          <DialogContent {...(contentProps || {})}>
            {children}
          </DialogContent>
          <DialogActions
            {...(actionsProps || {})}
          >
            {/* <Space> */}
            { showReset && (
              <Reset {...(resetProps || {})}>
                {resetText}
              </Reset>
            )}
            { showSubmit && (
              <Submit
                {...{
                  ...(submitProps || {}),
                  onSubmit,
                }}
              >
                {submitText}
              </Submit>
            )}
            {/* </Space> */}
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

ModalForm.defaultProps = {
  destroyOnClose: true,
  showClose: true,
  showSubmit: true,
  showReset: true,
  resetText: '重置',
  submitText: '提交',
};
ModalForm.propTypes = {
  trigger: PropTypes.node.isRequired,
  title: PropTypes.node,
  titleProps: PropTypes.shape({
    classes: PropTypes.object,
    sx,
    style: PropTypes.object,
    className: PropTypes.string,
  }),
  contentProps: PropTypes.shape({
    classes: PropTypes.object,
    dividers: PropTypes.bool,
    sx,
    style: PropTypes.object,
    className: PropTypes.string,
  }),
  actionsProps: PropTypes.shape({
    classes: PropTypes.object,
    sx,
    style: PropTypes.object,
    className: PropTypes.string,
    disableSpacing: PropTypes.bool,
  }),
  dialongProps: PropTypes.shape(dialog),
  onClose: PropTypes.func,
  fullScreen: PropTypes.bool, // false
  fullWidth: PropTypes.bool, // false
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf([ 'xs', 'sm', 'md', 'lg', 'xl', false ]),
    PropTypes.string,
  ]), // 'sm'
  showClose: PropTypes.bool,
  showSubmit: PropTypes.bool,
  showReset: PropTypes.bool,
  submitText: PropTypes.node,
  submitProps: PropTypes.shape({
    classes: PropTypes.object,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    loadingIndicator: PropTypes.node,
    loadingPosition: PropTypes.oneOf([ 'center', 'start', 'end' ]), // 'center'
    sx,
    variant: PropTypes.oneOfType([ PropTypes.oneOf([ 'contained', 'outlined', 'text' ]), PropTypes.string ]), // 'contained'
  }),
  resetText: PropTypes.node,
  resetProps: PropTypes.object,
  onFinish: PropTypes.func, // interface: value => void | bool | any
  destroyOnClose: PropTypes.bool,
};

export default ModalForm;
