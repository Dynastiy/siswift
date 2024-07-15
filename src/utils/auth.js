import CryptoJS from 'crypto-js';

const SECRET_KEY = 'my-static-secret-key'; // You should store this key securely and not hard-code it

export function encodeAndStoreToken(token) {
  try {
    const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    return encryptedToken;
  } catch (error) {
    console.error('Error encoding the token', error);
    return null;
  }
}

export function decodeToken(token) {
  try {
    if (!token) {
      return null;
    }
    const bytes = CryptoJS.AES.decrypt(token, SECRET_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  } catch (error) {
    console.error('Error decoding the token', error);
    return null;
  }
}