import ActionModel from "../models/ActionModel";
import ConfigsAppTypes from "./TypesApp";

const ConfigsApp = (state: ConfigsAppModel = ConfigsAppInitialState, {type, payload}: ConfigsAppActionModel): ConfigsAppModel => {
    switch (type) {
        case ConfigsAppTypes.RegisterCodeChange:
            return {
                ...state,
                claveRegistro: payload as registerCodeModel
            }
        case ConfigsAppTypes.LoadingSuccess:
            return {
                ...state,
                state: ConfigsAppState.completed
            }
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
}

export const ConfigsAppInitialState: ConfigsAppModel = {
    state: ConfigsAppState.none,
    registradoCompletado: false,
    biometrics: false,
}