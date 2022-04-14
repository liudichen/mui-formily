/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-11 22:43:10
 * @LastEditTime: 2022-04-11 22:43:11
 */
const isImageFileType = (type) => type.indexOf('image/') === 0;
const extname = (url = '') => {
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [ '' ])[0];
};
/**
 * @description 判断文件是否是图片
 * @param {File} file 文件
 * @return {boolean} 结果
 */
const isImage = (file) => {
  if (file.type && !file.thumbUrl && !file.url) {
    return isImageFileType(file.type);
  }
  const url = file.thumbUrl || file.url || '';
  const extension = extname(url);
  if (
    /^data:image\//.test(url) ||
    /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(extension)
  ) {
    return true;
  }
  if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  }
  if (extension) {
    // other file types which have extension
    return false;
  }
  return true;
};

export default isImage;
