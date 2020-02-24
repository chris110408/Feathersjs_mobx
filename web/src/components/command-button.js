import {Button} from "grey-vest";
import React from "react";
import {  useObserver } from "mobx-react";


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
