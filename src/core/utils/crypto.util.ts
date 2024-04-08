import * as cryptoJs from 'crypto-js';

export const encrypt = (text: string, key: string) => {
  return cryptoJs.AES.encrypt(text, key).toString();
};

export const decrypt = (encryptedBase64: string, key: string) => {
  const decrypted = cryptoJs.AES.decrypt(encryptedBase64, key);
  if (decrypted) {
    try {
      const str = decrypted.toString(cryptoJs.enc.Utf8);
      if (str.length > 0) {
        return str;
      } else {
        return 'error 1';
      }
    } catch (e) {
      return 'error 2';
    }
  }
  return 'error 3';
};
