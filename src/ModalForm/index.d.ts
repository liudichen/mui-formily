/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:36:59
 * @LastEditTime: 2022-05-18 15:32:40
 */
import React from 'react';
import { DialogActionsProps, DialogContentProps, DialogProps, DialogTitleProps, LinkProps } from '@mui/material';
import { IFormProps, Form } from '@formily/core';

import { ResetProps } from '../Reset';
import { SubmitProps } from '../Submit';

type variant = 'contained' | 'outlined' | 'text';
type maxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export interface ModalFormProps {
  memo?: boolean,
  extraActions?: React.ReactNode | React.ReactNode[],
  disabled?: boolean,
  /**
   * this is @formily/core createForm's props
   * @default {validateFirst:true}
   */
  triggerProps?: LinkProps,
  createFormOptions?: IFormProps,
  trigger?: React.ReactNode,
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
  submitText?: React.ReactNode,
  resetText?: React.ReactNode,
  resetProps?: ResetProps,
  onFinish?: (value: object) => void,
  destroyOnClose?: boolean,
}

declare const ModalForm: React.ForwardRefRenderFunction<Form, ModalFormProps>;

export default ModalForm;
