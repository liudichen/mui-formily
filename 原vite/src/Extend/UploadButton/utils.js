/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-28 10:01:16
 * @LastEditTime: 2022-03-28 10:25:00
 */
const isSameFile = (f1, f2) => {
  if (f1.name !== f2.name || f1.size !== f2.size || f1.type !== f2.type || f1.lastModified !== f2.lastModified) {
    return false;
  }
  return true;
};

/**
 * @description 返回更新后的文件列表，如果newFile在原fileList里则替换，否则添加进去
 * @param {File | File[]} newfile 新增的文件或文件列表
 * @param {File[]} fileList 原文件列表
 * @return {File[] | null} 新的文件列表，如果newFile为空，则返回null，表示不更新
 */
const updateFileList = (newfile, fileList) => {
  const newFileList = Array.isArray(newfile) ? newfile : (newfile ? [ newfile ] : []);
  if (!newFileList.length) return null;
  const nextFileList = [ ...fileList ];
  for (let i = 0; i < newFileList.length; i++) {
    const file = newFileList[i];
    const fileIndex = nextFileList.findIndex((item) => isSameFile(item, file));
    if (fileIndex === -1) {
      nextFileList.push(file);
    } else {
      nextFileList[fileIndex] = file;
    }
  }
  return nextFileList;
};

/**
 * @description 移除特定文件，返回移除该文件后的新的文件列表
 * @param {File} file 待移除文件
 * @param {File[]} fileList 当前文件列表
 * @return {File[] | null} 新的文件列表,如果没有变化的返回null
 */
const removeFileItem = (file, fileList) => {
  const newFileList = fileList.filter((item) => !isSameFile(item, file));
  if (newFileList.length === fileList.length) {
    return null;
  }
  return newFileList;
};

export {
  updateFileList,
  removeFileItem,
};
