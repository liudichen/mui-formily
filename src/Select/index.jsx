/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 15:22:22
 * @LastEditTime: 2022-04-15 18:49:20
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { Autocomplete } from 'mui-formfield';

const FormilySelect = connect(
  Autocomplete,
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

FormilySelect.displayName = 'formilyMuiFormilySelect';

export default FormilySelect;
