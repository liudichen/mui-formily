/*
 * @Description: formField的布局组件，如果子组件有 item 或 container 属性(默认为Grid组件)则返回自身，否则返回用Gird包裹的组件，
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-23 15:12:38
 * @LastEditTime: 2022-03-27 21:18:07
 */
import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { useCreation } from 'ahooks';

import { getItemColsProps } from './utils';

const FieldLayout = (props) => {
  const {
    xs, sm, md, lg, xl,
    children,
    fullWidth,
    ...restProps
  } = props;
  const itemBaseProps = useCreation(() => getItemColsProps({ xs, sm, md, lg, xl }), [ xs, sm, md, lg, xl ]);
  return (
    <Grid container {...restProps}>
      { Children.map(children, (child) => {
        if (!child) {
          return null;
        }
        const childExtraProps = {};
        if (child.props.fullWidth !== false && !child.props.isFieldAction) {
          if (fullWidth !== undefined || child.props.fullWidth !== undefined) {
            childExtraProps.fullWidth = fullWidth || child.props.fullWidth;
          }
        }
        const itemGridProps = { ...itemBaseProps, ...getItemColsProps(child.props) };
        if (child.props.item === true || child.props.container === true) {
          return child;
        }
        return (
          <Grid item {...itemGridProps} >
            { cloneElement(child, childExtraProps) }
          </Grid>
        );
      })}
    </Grid>
  );
};

FieldLayout.defaultProps = {
  fullWidth: true,
  columns: 12,
  spacing: 1,
  xs: 6,
  sm: 4,
  md: 3,
  xl: 2,
  alignItems: 'center',
};

FieldLayout.propTypes = {
  fullWidth: PropTypes.bool,
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
  xs: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool, PropTypes.oneOf([ 'auto' ]) ]), // false
  sm: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool, PropTypes.oneOf([ 'auto' ]) ]), // false
  md: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool, PropTypes.oneOf([ 'auto' ]) ]), // false
  lg: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool, PropTypes.oneOf([ 'auto' ]) ]), // false
  xl: PropTypes.oneOfType([ PropTypes.number, PropTypes.bool, PropTypes.oneOf([ 'auto' ]) ]), // false
};

FieldLayout.displayName = 'FieldLayout';

export default FieldLayout;
