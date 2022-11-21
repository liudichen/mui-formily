/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-12 16:05:52
 * @LastEditTime: 2022-04-30 14:07:26
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { CheckboxGroup } from 'mui-formfield';

const FormilyCheckboxGroup = connect(
  CheckboxGroup,
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

FormilyCheckboxGroup.Button = connect(
  CheckboxGroup.Button,
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
FormilyCheckboxGroup.displayName = 'formilyMuiCheckboxGroup';

export default FormilyCheckboxGroup;
