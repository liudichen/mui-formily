/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-11 22:57:25
 * @LastEditTime: 2022-04-15 19:51:39
 */
import React from 'react';
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { DatePicker } from 'mui-formfield';

const FormilyDatePicker = connect(
  DatePicker,
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
  }
  )
);

FormilyDatePicker.displayName = 'formilyMuiDatePicker';

export default FormilyDatePicker;
