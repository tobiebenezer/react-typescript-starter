import { makeObservable, observable } from "mobx";
import { API_URL } from "../config/env";
import { Appstore } from "./app";
import { AuthStore } from "./auth";
import { UsersStore } from "./user";

export class RootStore {
    
    AppStore:Appstore;
    UserStore:UsersStore;
    AuthStore: AuthStore;
    global:Boolean = true;
    onlyActions:Boolean = true;
    name:string = API_URL || 'app-name';
    version = 1;

    constructor(){
        this.AppStore = new Appstore(this);
        this.UserStore = new UsersStore(this);
        this.AuthStore = new AuthStore(this);

        makeObservable(this,{
            version: observable,
        });
    }

}

const rootStore = new RootStore();

export default rootStore;