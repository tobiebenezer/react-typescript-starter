import { observer } from "mobx-react-lite"
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { routes } from "../config/routes";
import { Iroute} from "../models";
import  rootStore from "../store";


export const PrivateRoute = observer((props:Iroute): JSX.Element =>{
    const {
        AuthStore: {state}
    } = rootStore;

    if(state!.data!.token){
        return <Route {...props} />;
    }

    return <Navigate to= {routes.index.path} />
})
