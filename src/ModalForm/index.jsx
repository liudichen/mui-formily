import PropTypes from 'prop-types';
import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import { useCreation, useMemoizedFn, useSafeState } from 'ahooks';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link } from '@mui/material';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';
import CloseIcon from '@mui/icons-material/Close';

import Reset from '../Reset';
import Submit from '../Submit';
import { sx, dialog, createFormOptions } from '../propTypes';

const ModalForm = forwardRef((props, ref) => {
  const {
    trigger, title, titleProps, contentProps, actionsProps, triggerProps,
    dialongProps, sx, maxWidth, fullWidth, fullScreen,
    children,
    showClose, showReset, showSubmit,
    submitText, resetText, submitProps, resetProps, createFormOptions, memo,
    onFinish, destroyOnClose, extraActions,
    open: openProp, onClose: onCloseProp,
    disabled,
  } = props;
  const [ open, setOpen ] = useSafeState(false);
  const dp = useCreation(() => {
    return memo ? [ ] : undefined;
  }, [ memo ]);
  const form = useMemo(() => createForm(createFormOptions), dp);

  useImperativeHandle(ref, () => form, [ form ]);

  const onClose = useMemoizedFn(() => {
    onCloseProp?.();
    if (trigger) {
      setOpen(false);
    }
  });
  const onSubmit = useMemoizedFn(async (values) => {
    const res = await onFinish?.(values);
    if (res === true) {
      onClose();
      if (destroyOnClose) {
        form?.reset('*');
      }
    }
  });
  if (trigger) {
    return (
      <>
        <Link
          {...{
            underline: 'none',
            sx: { cursor: 'pointer' },
            ...(triggerProps || {}),
            onClick: (e) => {
              !disabled && setOpen(true);
              triggerProps?.onClick?.(e);
            },
          }}
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
              { !!extraActions && (
                extraActions
              )}
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
            </DialogActions>
          </FormProvider>
        </Dialog>
      </>
    );
  }

  return (
    <Dialog
      {...{
        ...(dialongProps || {}),
        open: !!openProp,
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
          { !!extraActions && (
            extraActions
          )}
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
        </DialogActions>
      </FormProvider>
    </Dialog>
  );

});

ModalForm.defaultProps = {
  destroyOnClose: true,
  showClose: true,
  showSubmit: true,
  showReset: true,
  resetText: '重置',
  submitText: '提交',
  createFormOptions: { validateFirst: true },
  memo: true,
};
ModalForm.propTypes = {
  memo: PropTypes.bool,
  extraActions: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  disabled: PropTypes.bool,
  triggerProps: PropTypes.shape({
    sx: PropTypes.object,
    style: PropTypes.object,
    underline: PropTypes.oneOf([ 'none', 'always', 'hover' ]),
  }),
  createFormOptions,
  trigger: PropTypes.node,
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
  dialogProps: PropTypes.shape(dialog),
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
    onSubmitSuccess: PropTypes.func,
    onSubmitFailed: PropTypes.func,
  }),
  resetText: PropTypes.node,
  resetProps: PropTypes.object,
  onFinish: PropTypes.func, // interface: value => void | bool | any
  destroyOnClose: PropTypes.bool,
};

export default ModalForm;
