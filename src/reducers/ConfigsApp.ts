import ActionModel from "../models/ActionModel";
import ConfigsAppTypes from "./TypesApp";
import AsyncStorage from "@react-native-community/async-storage";

const ConfigsApp = (state: ConfigsAppModel = ConfigsAppInitialState, {type, payload}: ConfigsAppActionModel): ConfigsAppModel => {
    let newState;
    switch (type) {
        case ConfigsAppTypes.RegisterCodeChange:
            newState = {
                ...state,
                claveRegistro: payload as registerCodeModel
            };
            AsyncStorage.setItem('ConfigsApp', JSON.stringify(newState)).then().catch();
            return newState;
        case ConfigsAppTypes.LoadingSuccess:
            newState = {
                ...state,
                ...payload,
                state: ConfigsAppState.completed,
            };
            AsyncStorage.setItem('ConfigsApp', JSON.stringify(newState)).then().catch();
            return newState;
        case ConfigsAppTypes.ChangeCardOInUse:
            newState = {
                ...state,
                ...payload,
                state: ConfigsAppState.completed,
            };
            AsyncStorage.setItem('ConfigsApp', JSON.stringify(newState)).then().catch();
            return newState;
        case ConfigsAppTypes.SaveCodeAuth:
            newState = {
                ...state,
                ...payload,
                state: ConfigsAppState.completed,
            };
            AsyncStorage.setItem('ConfigsApp', JSON.stringify(newState)).then().catch();
            return newState;
        default:
            return state;
    }
}

export default ConfigsApp;


export interface ConfigsAppActionModel<P = any, T = ConfigsAppTypes> extends ActionModel<P, T> {
}

export enum ConfigsAppState {
    none,
    loading,
    completed,
    error,
    saving,
}


export interface registerCodeModel {
    posPIN: number,
    coord1: string,
    coord2: string
}

export interface ConfigsAppModel {
    state: ConfigsAppState;
    claveRegistro?: registerCodeModel;
    registradoCompletado: boolean;
    biometrics: boolean;
    cardInUse?: string;
    authCode?: string;
    lastConnect?: number;
}

export const ConfigsAppInitialState: ConfigsAppModel = {
    state: ConfigsAppState.none,
    registradoCompletado: false,
    biometrics: false,
}