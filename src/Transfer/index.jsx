/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-18 18:39:09
 * @LastEditTime: 2022-04-30 14:12:56
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { Transfer } from 'mui-formfield';

const FormilyTransfer = connect(
  Transfer,
  mapProps({
    title: 'label',
    description: 'tooltip',
    required: true,
    readOnly: true,
    disabled: true,
    initialValue: 'defaultValue',
    dataSource: 'options',
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
  }
  )
);

FormilyTransfer.displayName = 'formilyMuiTransfer';

export default FormilyTransfer;
