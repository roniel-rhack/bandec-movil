// @ts-ignore
import {privateKey} from 'react-native-dotenv'
import CryptoJS from "crypto-js";

export const encrypt = (cad: string): string => {
    return CryptoJS.AES.encrypt(cad, privateKey).toString();
}

export const decrypt = (cad: string): string => {
    var bytes = CryptoJS.AES.decrypt(cad, privateKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext.toString();
}
