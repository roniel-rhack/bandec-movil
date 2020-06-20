import {Dispatch} from "redux";
import {ConfigsAppActionModel, registerCodeModel} from "../reducers/ConfigsApp";
import AsyncStorage from '@react-native-community/async-storage';
import ConfigsAppTypes from "../reducers/TypesApp";

export const LoadConfigsApp = () => {
    return (dispatch: Dispatch<ConfigsAppActionModel>, getState: Function) => {
        dispatch({type: ConfigsAppTypes.LoadingBegin});
        AsyncStorage.getItem("ConfigsApp")
            .then(value => {
                dispatch({type: ConfigsAppTypes.LoadingSuccess, payload: value});
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