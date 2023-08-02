import { action } from "mobx";
import { observable } from "mobx";
import { makeObservable } from "mobx";
import { RootStore } from ".";
import { history, routes } from "../config/routes";
import { getAuth, setAuth } from "../services/localStorage";
import { IAuth } from "../types"

export type IInitialState = {
    data: IAuth;
};

export const initialState: IInitialState = {
    data:{
        expires:null,
        token :null,
    },
};

export class AuthStore {
    state: IInitialState = initialState;
    rootStore:RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;

        makeObservable(this,{
            state: observable,
            setState: action
        });

        /* use this space to hydrate start form localStorage */
        const auth_data = getAuth();
        const state_data: IAuth = auth_data?.token ? auth_data : initialState.data;
        const state: IInitialState = {
            ...initialState,
            data: state_data
        }

        this.setState(state);
    }

    onLogin = ()=>{
        // do somthing when loged in
    };

    onLogOut = () => {
        this.reset();
        this.rootStore.UserStore.reset();
        history.replace(routes.index.path);
    };

    setState(params:Partial<IInitialState>){
        const {state } = this
        this.state = {
            ...state,
            ...params
        };

        /* use this to save/sync with localStorge */
        setAuth({value: state.data}) // keeping storage updated
    };

    reset(){
        this.state = initialState;
        /* reset localStorage also */
        setAuth({value:initialState.data});
    }
}