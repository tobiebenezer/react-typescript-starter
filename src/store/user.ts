import { action, makeObservable, observable } from "mobx";
import { RootStore } from ".";
import { history, routes } from "../config/routes";
import { get } from "../services/request";
import { IUser } from "../types";


export type IInitialState = {
    data: {
        users: IUser[] | null;
        total: number | null;
    },
    ui: {
        isUsersLoading: boolean;
    }
}

export const initialState:IInitialState = {
  data: {
    users:null,
    total:null,
  },
  ui: {
    isUsersLoading: false,
  }
} 

export class UsersStore{
    state:IInitialState;
    rootStore: RootStore;

    constructor(rootStore:RootStore){

        makeObservable(this,{
            state: observable,
            setState:action,
            reset: action,
        });

        this.state = initialState;
        this.rootStore = rootStore;
    }

    async getUsers(){
        this.setState({
            ui: {isUsersLoading : true}
        });

        try{
            const response = await get({subUrl:"users"});
            this.setState({
                data:{
                    users: response?.data?.users,
                    total: response?.data?.total,
                },
                ui:{
                    isUsersLoading: false
                }
            });
        } catch{
            this.setState({
                ui:{
                    isUsersLoading :false
                }
            });

            console.error('error loading users');
        }

    }

    getUser(params: {user_id : number}){
        const {user_id} = params
        history.push(routes.userProfile.path_string({user_id}));
    }

    setState(params:Partial<IInitialState>){
        const { state } = this
        this.state = {
            ...state,
            ...params,
        }

        // update the local storage here
    }

    reset(){
        this.state = initialState;
        //update the local storage here
    }

    
}