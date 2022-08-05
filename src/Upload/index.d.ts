/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 19:30:51
 * @LastEditTime: 2022-08-05 20:55:53
 */
import React from 'react';
import { fieldTransformProps } from '../types';
import { UploadButtonProps } from 'mui-formfield';

export interface UploadProps extends Omit<UploadButtonProps, 'label'| 'tooltip'| 'defaultValue'>, fieldTransformProps {
  initialValue?: any,
}

declare const FormilyUpload: React.FunctionComponent<UploadProps>;

export default FormilyUpload;
