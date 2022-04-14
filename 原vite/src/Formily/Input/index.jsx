/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-11 22:50:59
 * @LastEditTime: 2022-04-12 16:20:29
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';

import TextField from '../../Extend/TextField';

const FormilyInput = connect(
  TextField,
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

FormilyInput.displayName = 'formilyMuiInput';

export default FormilyInput;
