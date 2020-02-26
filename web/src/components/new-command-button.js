import { observer } from "mobx-react";
import { Button } from "grey-vest";
import React from "react";
import _ from "lodash/fp";

const NewCommandButton = ({ command, children, ...attrs }) => {
    const handleClick = e => _.isFunction(command.mainFn)&&command.mainFn(command.arg);
    return (
        <Button
            type='submit'
            primary={attrs ? true : false}
            onClick={handleClick}
            disabled={command.mainFn.state.processing}
            {...attrs}
        >
            {command.mainFn.state.status || children}
        </Button>
    );
};

export default observer(NewCommandButton);
