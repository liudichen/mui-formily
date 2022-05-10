/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:59
 * @LastEditTime: 2022-05-10 10:35:21
 */
import React from 'react';
import { IFormProps, Form } from '@formily/core';
import { StepIconProps, ButtonProps } from '@mui/material';

import { SubmitProps } from '../../Submit';

interface objectValue {
  [key: string] : any,
}

export interface StepFormProps {
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  icon?: React.FunctionComponent<StepIconProps> | React.Component<StepIconProps>,

  current?: number,
  stepIndex?: number,
  stepsCount?: number,
  previousValues?: object,

  initialValues: objectValue, // 直接通过props传递的initialValues，如果createFormOption里指定了initalValues则此值不会生效，而只会用来重置
  showStepReset: boolean, // 是否显示步骤的重置按钮，如果没设置则采用父级StepsForm设置
  stepResetMode: 'initial' | 'lastCommit', // 重置模式：重置到初始状态，或者上次提交时的状态

  createFormOptions?: IFormProps,
  onSubmit?: (values: object) => void,
  onPrevious?: () => void,
  previousText?: React.ReactNode,
  resetProps?: Omit<ButtonProps, 'onClick'>,
  nextText?: [React.ReactNode, React.ReactNode],
  resetText?: React.ReactNode,
  submitProps?: Omit<SubmitProps, 'onSubmit'>,
}

declare const StepForm: React.ForwardRefRenderFunction<Form, StepFormProps>;

export default StepForm;
