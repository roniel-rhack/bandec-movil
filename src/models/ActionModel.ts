import {Action} from "redux";
import ConfigsAppTypes from "../reducers/TypesApp";

export default interface ActionModel<P = any, T = ConfigsAppTypes> extends Action<T> {
    payload?: P;
}