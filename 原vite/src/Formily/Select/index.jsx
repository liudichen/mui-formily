import { connect, mapProps } from '@formily/react';
import { isVoidField } from '@formily/core';

import Autocomplete from '../../Extend/Autocomplete';

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
      error: field.selfInvalid,
      helperText: field.selfErrors.join(),
      ...props,
    };
  }
  )
);

FormilySelect.displayName = 'formilyMuiFormilySelect';

export default FormilySelect;
