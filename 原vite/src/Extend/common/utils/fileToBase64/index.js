/**
 * @description file转Base64
 * @param {File} file 文件
 * @return {string} base64
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (e) => {
      reject('文件读取错误');
    };
  });
};

export default fileToBase64;
