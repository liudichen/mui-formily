/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-06-21 15:21:54
 * @LastEditTime: 2022-06-21 15:22:35
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { DateRangePicker } from 'mui-formfield';

const FormilyDateRangePicker = connect(
  DateRangePicker,
  mapProps({
    title: 'label',
    description: 'tooltip',
    required: true,
    readOnly: true,
    disabled: true,
    initialValue: 'defaultValue',
  },
  (props, field) => {
    if (!field || isVoidField(field)) return props;
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

FormilyDateRangePicker.displayName = 'formilyMuiDateRangePicker';

export default FormilyDateRangePicker;
