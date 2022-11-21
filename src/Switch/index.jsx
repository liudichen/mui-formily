/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-11 22:55:13
 * @LastEditTime: 2022-04-14 15:33:54
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { Switch } from 'mui-formfield';

const FormilySwitch = connect(
  Switch,
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

FormilySwitch.displayName = 'formilyMuiSwitch';

export default FormilySwitch;
