import { requestAccountLogin } from "../services/login";
import {observable, action, reaction,flow, decorate} from 'mobx';
import _ from "lodash/fp";


class GlobalStore {
    currentUser=null
    history=null
    token=null



    //effect

    loginEffect=  flow(function*(payload){
        try {
            const res = yield requestAccountLogin(_.assign({"strategy": "local"},payload));

            return { res, store:this };
        } catch (e) {
            throw e;
        }
    })
    setCurrentUser=(user) =>{
        this.currentUser = user
    }


}

decorate(GlobalStore, {
    currentUser: observable,
    history: observable,
    token: observable,

    loginEffect: action,
    setCurrentUser:action
});

const globalStore = new GlobalStore()

export default globalStore
