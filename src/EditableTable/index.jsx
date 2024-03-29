/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-20 16:19:09
 * @LastEditTime: 2022-05-09 20:05:44
 */
import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';
import { EditableTable } from 'mui-formfield';

const FormilyEditableTable = connect(
  EditableTable,
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

FormilyEditableTable.displayName = 'formilyMuiEditableTable';

export default FormilyEditableTable;
