/* eslint-disable no-unused-vars */
/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-23 19:05:13
 * @LastEditTime: 2022-03-23 19:47:33
 */
import PropTypes from 'prop-types';
import { Children } from 'react';
import { Grid } from '@mui/material';

import { getItemColsProps } from '../FieldLayout/utils';

const FieldAction = (props) => {
  const {
    isFieldAction,
    children,
    ...restProps
  } = props;
  return (
    <Grid container {...restProps}>
      { Children.map(children, (child) => {
        const itemGridProps = getItemColsProps(child.props);
        return (
          <Grid item {...itemGridProps}>
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
};

FieldAction.defaultProps = {
  isFieldAction: true,
  spacing: 0.5,
  alignItems: 'center',
  direction: 'row',
  textAlign: 'center',
};

FieldAction.propTypes = {
  isFieldAction: PropTypes.bool, // 额外的一个用来指示组件类型的props，不会向下传递
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]), // 12
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  columnSpacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  rowSpacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  direction: PropTypes.oneOfType([
    PropTypes.oneOf([ 'row', 'row-reverse', 'column', 'column-reverse' ]),
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOf([ 'row', 'row-reverse', 'column', 'column-reverse' ])),
  ]), // 'row'
  wrap: PropTypes.oneOf([ 'wrap', 'wrap-reverse', 'nowrap' ]), // 'wrap'
  zeroMinWidth: PropTypes.bool, // false
};

FieldAction.displayName = 'FieldAction';

export default FieldAction;
