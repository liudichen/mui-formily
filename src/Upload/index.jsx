/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 15:22:22
 * @LastEditTime: 2022-04-30 14:13:01
 */
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
      fullWidth: true,
      error: field.selfInvalid,
      helperText: field.selfErrors.join(),
      ...props,
    };
  })
);

export default FormilyUpload;
