import { observer } from "mobx-react";
import { Button } from "grey-vest";
import React from "react";

const CommandButton = ({ command, arg = {}, children, ...attrs }) => {
  const handleClick = item => command(arg);
  return (
    <Button
      type='submit'
      primary={attrs ? true : false}
      onClick={handleClick}
      disabled={command.state.processing}
      {...attrs}
    >
      {command.state.status || children}
    </Button>
  );
};

export default observer(CommandButton);
