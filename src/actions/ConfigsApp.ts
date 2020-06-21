import {Dispatch} from "redux";
import {ConfigsAppActionModel, ConfigsAppModel, registerCodeModel} from "../reducers/ConfigsApp";
import AsyncStorage from '@react-native-community/async-storage';
import ConfigsAppTypes from "../reducers/TypesApp";
import ReactNativeBiometrics from 'react-native-biometrics'

export const LoadConfigsApp = () => {
    return (dispatch: Dispatch<ConfigsAppActionModel>, getState: Function) => {
        dispatch({type: ConfigsAppTypes.LoadingBegin});
        AsyncStorage.getItem('ConfigsApp')
            .then(value => {
                if (!value) {
                    ReactNativeBiometrics.isSensorAvailable()
                        .then((resultObject) => {
                            const {available, biometryType} = resultObject
                            if (available && biometryType === ReactNativeBiometrics.Biometrics) {
                                dispatch({
                                    type: ConfigsAppTypes.LoadingSuccess,
                                    payload: {biometrics: true} as ConfigsAppModel
                                });
                            } else {
                                dispatch({
                                    type: ConfigsAppTypes.LoadingSuccess,
                                    payload: {biometrics: false} as ConfigsAppModel
                                });
                            }
                        })
                } else {
                    setTimeout(() => {
                        dispatch({type: ConfigsAppTypes.LoadingSuccess, payload: JSON.parse(value)});
                    }, 2500)
                }
            })
            .catch(reason => {
                dispatch({type: ConfigsAppTypes.LoadingFailure, payload: reason});
            })
    }
}


export const captureRegisterCode = (code: registerCodeModel) => {
    return (dispatch: Dispatch<ConfigsAppActionModel>, getState: Function) => {
        dispatch({type: ConfigsAppTypes.RegisterCodeChange, payload: code})
    }
}