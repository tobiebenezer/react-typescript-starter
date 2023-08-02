import * as React from 'react';
import {createBrowserHistory } from 'history'
import { IRoutesConfig} from "../models"


export const history = createBrowserHistory();

export const routes: IRoutesConfig = {
  "index": {
        id: "index",
        name: 'Home',
        description: 'Home Page',
        path:'/',
        path_string:()=>{
            return '/';
        },
        exact: true,
        isPrivate: false,
        Component: React.lazy(()=>import('../pages/HomePage')
                    .then(({Home})=> ({default: Home}))),
    },

    "userList":{
        id:"userList",
        name: "userList",
        description: "List of users",
        path: "/users",
        path_string(){
            return "/users"
        },
        exact: true,
        isPrivate:true,
        Component: React.lazy(()=>import('../pages/Users')
                    .then(({Users})=>({default: Users}))),        
    },
    
    "userProfile":{
        id:"userprofile",
        name: "userProfile",
        description: "Show User Profile Details",
        path: "/user-profile",
        path_string(){
            return "/user-profile"
        },
        exact: true,
        isPrivate:true,
        Component: React.lazy(()=>import('../pages/UserProfile')
                    .then(({UserProfile})=>({default: UserProfile}))),        
    },
}
