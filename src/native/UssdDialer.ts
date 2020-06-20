import {NativeModules} from 'react-native';

export interface UssdDialerI {
    autenticateUSSDCode: (code: string) => Promise<string>;
    registerUSSDCode: (card: string, name: string, expireDate: string) => Promise<string>;
}

const UssdDialer: UssdDialerI = {
    autenticateUSSDCode: NativeModules.UssdDialer.autenticateUSSDCode,
    registerUSSDCode: NativeModules.UssdDialer.registerUSSDCode,
}

export default UssdDialer;
