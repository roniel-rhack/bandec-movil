import {applyMiddleware, Dispatch, Middleware, MiddlewareAPI, StoreEnhancer} from "redux";
import thunk from "redux-thunk";
import ActionModel from "../models/ActionModel";


const loggerMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch<ActionModel>) => (action: ActionModel) => {
    const {type, payload} = action;
    console.info('dispatching', type);
    console.info('with payload', payload);
    return next(action);
};

const middlewares: StoreEnhancer = applyMiddleware(
    thunk, loggerMiddleware
);

export default middlewares;
