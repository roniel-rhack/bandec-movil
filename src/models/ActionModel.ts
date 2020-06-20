import {Action} from "redux";

export default interface ActionModel<P = any, T = any> extends Action<T> {
    payload?: P;
}