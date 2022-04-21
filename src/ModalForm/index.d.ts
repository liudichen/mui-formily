/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:36:59
 * @LastEditTime: 2022-04-21 12:01:00
 */
import React from 'react';
import { DialogActionsProps, DialogContentProps, DialogProps, DialogTitleProps } from '@mui/material';
import { IFormProps } from '@formily/core';

import { ResetProps } from '../Reset';
import { SubmitProps } from '../Submit';

type variant = 'contained' | 'outlined' | 'text';
type maxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;


export interface ModalFormProps {
  /**
   * this is @formily/core createForm's props
   * @default {validateFirst:true}
   */
  createFormOptions?: IFormProps,
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
  submitProps?: Omit<SubmitProps, 'onSubmit'>,
  resetText?: React.ReactNode,
  resetProps?: ResetProps,
  onFinish?: (value: object) => void,
  destroyOnClose?: boolean,
}

declare const ModalForm: React.FunctionComponent<ModalFormProps>;

export default ModalForm;
