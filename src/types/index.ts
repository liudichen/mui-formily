/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 18:42:26
 * @LastEditTime: 2022-04-15 19:14:02
 */
import React from 'react';
import { ToggleButtonGroupProps as TbgProps } from 'mui-formfield';

export interface fieldTransformProps {
  title?: React.ReactNode,
  description?: React.ReactNode,
}

export interface ToggleButtonGroupProps extends Omit<Omit<Omit<Omit<TbgProps, 'label'>, 'tooltip'>, 'defaultValue'>, 'options'>, fieldTransformProps {
  initialValue?: any[],
  dataSource?: any[],
}
