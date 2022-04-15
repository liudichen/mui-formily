/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 15:22:22
 * @LastEditTime: 2022-04-15 19:52:30
 */
import React from 'react';
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { UploadButton as Upload } from 'mui-formfield';

const FormilyUpload = connect(
  Upload,
  mapProps({
    title: 'label',
    description: 'tooltip',
    required: true,
    readOnly: true,
    disabled: true,
    initialValue: 'defaultValue',
  },
  (props, field) => {
    if (isVoidField(field)) return props;
    return {
      showHelperText: true,
      error: field.selfInvalid,
      helperText: field.selfErrors.join(),
      ...props,
    };
  })
);

export default FormilyUpload;
