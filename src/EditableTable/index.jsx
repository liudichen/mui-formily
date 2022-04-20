// eslint-disable-next-line no-unused-vars
import React from 'react';
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

FormilyEditableTable.displayName = 'formilyMuiEditableTable';

export default FormilyEditableTable;
