/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-12 16:52:37
 * @LastEditTime: 2022-04-12 16:52:37
 */
import PropTypes from 'prop-types';

const sx = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])),
  PropTypes.func,
  PropTypes.object,
]);

export {
  sx,
};
