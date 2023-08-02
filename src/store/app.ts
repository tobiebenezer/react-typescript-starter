import { observable, action , makeObservable } from "mobx";
import { RootStore } from ".";


export type IInitialState = {
    data:{
        deferredPrompt: any;
    };
    ui: {
        isInternetConnection: boolean;
        isAddToHomeScreen: boolean;
    };
};

export const initialState:IInitialState = {
    data:{
        deferredPrompt:null
    },
    ui: {
        isInternetConnection:navigator.onLine,
        isAddToHomeScreen: false
    }
};

export class Appstore {
    state:IInitialState = initialState;
    rootStore : RootStore;

    constructor(rootStore: RootStore){
        
        makeObservable(this,{
            state:observable,
            setState:action,
            reset:action,
        });

        this.rootStore = rootStore;
        /**use it for hydrating state from localStorage */
    }

    checkInternetConnection(){
        const {ui} = this.state;
        this.setState({
            ui: {
                ...ui,
                isInternetConnection: navigator.onLine,
            }
        });
    };

    setPWADefferedPrompt(e:any){
        const {data} = this.state;
        this.setState({
            data:{...data,
            deferredPrompt:e}
        })
    }

    setState(params: Partial<IInitialState>){
        const {state} = this;
        this.state = {
            ...state,
            ...params,
        };

        /** use for saving/sync state with localstorage */
    }

    reset(){
        this.state = initialState
    }
};


