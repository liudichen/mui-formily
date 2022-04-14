/* eslint-disable no-unused-vars */
/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-26 15:08:09
 * @LastEditTime: 2022-04-11 23:13:54
 */
import PropTypes from 'prop-types';
import { Children } from 'react';
import { Box } from '@mui/material';

const spaceSize = {
  small: 8,
  medium: 16,
  large: 24,
};

const Space = (props) => {
  const { size, direction, children, flexDirection, split, ...restProps } = props;
  if (children === null || children === undefined) {
    return null;
  }
  const Size = Array.isArray(size) ? size : [ size, size ];
  const rowSpace = spaceSize[Size[0] || 'small'];
  const columnSpace = spaceSize[Size[1] || 'small'];
  return (
    <Box
      flexDirection={direction}
      {...restProps}
    >
      {Children.map(children, (child, index) => {
        let style = {};
        if (direction === 'column') {
          if (index < Children.count(children) - 1) {
            style = { marginBottom: columnSpace / (split ? 2 : 1) };
          }
        } else {
          if (index > 0) {
            style = { marginLeft: rowSpace / (split ? 2 : 1) };
          }
        }
        return (
          <>
            <div style={style}>
              {child}
            </div>
            {index < Children.count(children) - 1 && !!split && (
              <span style={style}>
                {split}
              </span>
            )}
          </>
        );
      })}
    </Box>
  );
};

Space.defaultProps = {
  size: 'small',
  direction: 'row',
  alignItems: 'center',
  display: 'flex',
};

Space.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf([ 'small', 'medium', 'large' ]),
    PropTypes.arrayOf(PropTypes.oneOf([ 'small', 'medium', 'large' ])),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  direction: PropTypes.oneOf([ 'row', 'column' ]),
  split: PropTypes.node,
};

export default Space;
