
import _,{flow} from "lodash/fp";
import F from "futil-js";
import { openNotificationWithIcon } from "./extend-antd";
import {observer} from 'mobx-react'


const error = (extend = F.conversion.defaultsOn) =>
    F.aspect({
        onError: F.tapError(e => {
            openNotificationWithIcon("error", e.name, e.message);
        }),
        name: "error"
    });

const redirectCommand =(url,msg="successful redirect")=> (extend = F.defaultsOn) =>
    F.aspect({
        after(result,_state,args) {
            if(args[0]&&result) {
                const {res, history} = result;
                res && openNotificationWithIcon("success", msg);
                history.push(url);
            }
        },
        name: "redirectCommand"
    });


const redirectSaveTokenCommand =(url,msg="successful redirect")=> (extend = F.defaultsOn) =>
    F.aspect({
        before(args){
           console.log(args)
        },
        after(result,_state,args) {
            if(args[0]&&result){
                const { res, store } = result;
                res && openNotificationWithIcon("success",msg);
                if(res){
                    store.token=res.accessToken
                    store.currentUser=res.user
                    store.history.push(url);
                }
            }
        },
        name: "redirectSaveTokenCommand"
    });


const doAfter =(fn)=>(extend = F.defaultsOn) =>
    F.aspect({
        after(result,state,args) {
            fn(result)
        },
        name: "doAfter"
    });


const  _Command = extend =>
    flow(
        F.aspects.status(extend),
        F.aspects.clearStatus(),
        F.aspects.concurrency(extend),
        error(extend)
    )


const extraCommand = (fn1,fn2,...args) =>  flow(fn1(...args),fn2(...args))





export {_Command,extraCommand,redirectCommand,redirectSaveTokenCommand,doAfter}
