import ActionModel from "../models/ActionModel";

const Auth = (state: AuthModel = AuthInitialState, {type, payload}: ActionModel): AuthModel => {
    switch (type) {
        default:
            return state;
    }
}

export default Auth;

export enum AuthState {
    "disconnected",
    "loading",
    "connected",
    "error",
}

export interface AuthModel {
    state: AuthState;
}

export const AuthInitialState: AuthModel = {
    state: AuthState.disconnected,
}