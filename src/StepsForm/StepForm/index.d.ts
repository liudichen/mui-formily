/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:59
 * @LastEditTime: 2022-05-09 15:09:54
 */
import React from 'react';
import { IFormProps, Form } from '@formily/core';
import { StepIconProps } from '@mui/material';

import { SubmitProps } from '../../Submit';

export interface StepFormProps {
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  icon?: React.FunctionComponent<StepIconProps> | React.Component<StepIconProps>,

  current?: number,
  stepIndex?: number,
  stepsCount?: number,
  previousValues?: object,

  createFormOptions?: IFormProps,
  onSubmit?: (values: object) => void,
  onPrevious?: () => void,
  previousText?: React.ReactNode,
  nextText?: [React.ReactNode, React.ReactNode],
  submitProps?: Omit<SubmitProps, 'onSubmit'>,
}

declare const StepForm: React.ForwardRefRenderFunction<Form, StepFormProps>;

export default StepForm;
