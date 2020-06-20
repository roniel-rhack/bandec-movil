import ActionModel from "../models/ActionModel";

const ConfigsApp = (state: ConfigsAppModel = ConfigsAppInitialState, {type, payload}: ConfigsAppActionModel): ConfigsAppModel => {
    switch (type) {
        default:
            return state;
    }
}

export default ConfigsApp;

export enum ConfigsAppTypes {
    LoadingBegin,
    LoadingSuccess,
    LoadingFailure,
}

export interface ConfigsAppActionModel<P = any, T = ConfigsAppTypes> extends ActionModel<P, T> {
}

export enum ConfigsAppState {
    none,
    loading,
    completed,
    error,
    saving,
}

export interface ConfigsAppModel {
    state: ConfigsAppState;
    registrado: boolean;
    biometrics: boolean;
}

export const ConfigsAppInitialState: ConfigsAppModel = {
    state: ConfigsAppState.none,
    registrado: false,
    biometrics: false,
}