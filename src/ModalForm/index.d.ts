/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:36:59
 * @LastEditTime: 2022-04-15 19:48:50
 */
import React from 'react';
import { DialogActionsProps, DialogContentProps, DialogProps, DialogTitleProps } from '@mui/material';

type variant = 'contained' | 'outlined' | 'text';
type maxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

interface submitProps {
  classes?: object,
  disabled?: boolean,
  loading?: boolean,
  loadingIndicator?: React.ReactNode,
  loadingPosition?: 'center' | 'start' | 'end',
  variant?: variant | string,
}

export interface ModalFormProps {
  trigger: React.ReactNode,
  title?: React.ReactNode,
  titleProps?: DialogTitleProps,
  contentProps?: DialogContentProps,
  actionsProps?: DialogActionsProps,
  dialogProps?: DialogProps,
  onClose?: () => void,
  fullScreen?: boolean,
  fullWidth?: boolean,
  maxWidth?: maxWidth | string,
  showClose?: boolean,
  showSubmit?: boolean,
  showReset?: boolean,
  submitProps?: submitProps,
  resetText?: React.ReactNode,
  resetProps?: object,
  onFinish?: (value: object) => void,
  destroyOnClose?: boolean,
}

declare const ModalForm: React.FunctionComponent<ModalFormProps>;

export default ModalForm;
