import {combineReducers} from "redux";
import Auth, {AuthModel} from "./Auth";
import ConfigsApp, {ConfigsAppModel} from "./ConfigsApp";

export interface rootStateModel {
    Auth: AuthModel,
    ConfigsApp: ConfigsAppModel
}

const reducers = combineReducers<rootStateModel>({
    Auth,
    ConfigsApp
});

export default reducers;