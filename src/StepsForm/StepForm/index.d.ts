/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 13:46:59
 * @LastEditTime: 2022-05-18 15:11:43
 */
import React from 'react';
import { StepIconProps, ButtonProps, BoxProps } from '@mui/material';
import { LoadingButtonProps } from '@mui/lab';

interface objectValue {
  [key: string] : any,
}

export interface StepFormProps extends BoxProps {
  name?: string,
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  icon?: React.FunctionComponent<StepIconProps> | React.Component<StepIconProps>,

  current?: number,
  stepIndex?: number,
  stepsCount?: number,

  handleStepChange?: (direction?: 'next' | 'previous' | number) => void,
  onFinish?: (values?: object, allValues?: object) => void,
  onPrevious?: () => void,
  previousText?: React.ReactNode,
  previousProps?: Omit<ButtonProps, 'onClick'>,
  nextText?: [React.ReactNode, React.ReactNode],
  nextProps?: Omit<Omit<LoadingButtonProps, 'onClick'>, 'loading'>,
}

declare const StepForm: React.ForwardRefRenderFunction<Form, StepFormProps>;

export default StepForm;
