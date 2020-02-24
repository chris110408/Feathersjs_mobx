import {observer} from "mobx-react";
import {Button} from "grey-vest";
import React from "react";
import * as _ from "lodash/fp";
import {  useObserver } from "mobx-react";
import LoginForm from "../pages/login/components/raw-form";


export const CommandButton =({command,arg=null, children,...attrs})=> {
    const handleClick = (item) => command(item?item:arg)

   return  useObserver(() => (
        <Button
            type='submit'
            primary={attrs?true:false}
            onClick={handleClick}
            disabled={command.state.processing}
            {...attrs}
        >
            {command.state.status || children}
        </Button>
    ))
}
