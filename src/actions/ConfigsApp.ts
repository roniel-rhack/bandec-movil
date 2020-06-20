import {Dispatch} from "redux";
import {ConfigsAppActionModel, ConfigsAppTypes} from "../reducers/ConfigsApp";
import AsyncStorage from '@react-native-community/async-storage';

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