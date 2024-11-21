import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_REACT_APP_CRYPTO_SECRET_KEY;

export const encryptText = (textToEncrypt: string): string => {
  if (!secretKey) {
    throw new Error("Secret key is not defined.");
  }
  if (!textToEncrypt) {
    throw new Error("Text to encrypt cannot be empty.");
  }
  const iv = CryptoJS.lib.WordArray.random(16);
  const key = CryptoJS.enc.Utf8.parse(secretKey);

  const encrypted = CryptoJS.AES.encrypt(textToEncrypt, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
};
