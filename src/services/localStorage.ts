import { appName } from "../config/env";
import { IAuth, IUser } from "../types";

const key:string = appName || "app-secret-key"

export const loadState = ()=>{
    try{
        const serializedState = localStorage.getItem(key);
        if(!serializedState){
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (error){
        return undefined;
    }
}

type IState = {
    auth:IAuth,
    user: IUser
};

export const lcStateDef = {
    auth: 'auth',
    user: 'user'
};

export const saveState = (state:IState) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem(key,serializedState);
    }catch {
        console.log('an error occured');
    }
}

export const getState = ({key}:{key:string}) => {
    const state = loadState();
    return state?.[key];
};

export const setState = ({key, value}:{key:string ; value: object}) => {
    const state = loadState() || {};
    const updatedState = {
        ...state,
        [key] : value
    };

    saveState(updatedState);
    return updatedState[key];
}

export const getAuth = ():IAuth=>{
    return getState({key:lcStateDef.auth});
}

export const setAuth = ({value}:{value:IAuth}):IAuth => {
    return setState({key: lcStateDef.auth,value});
}

export const getUser = ():IUser => {
    return getState({key: lcStateDef.user});
}

export const setUser  = ({value}:{value:IUser}):IUser =>{
    return setState({key:lcStateDef.user,value});
}