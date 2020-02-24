import React, { useContext } from "react";

import styled from "styled-components";

import { observer } from "mobx-react";

import "antd/dist/antd.css";
import { useHistory } from "react-router-dom";
import image from "../../img/login.svg";
import  {GobalStoreContext} from "../../store";



const Divform = styled.div`
 

  height: 100vh;
  width:100vh; 
  background-image: url(${image});
  background-size:cover;
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  margin:auto;
  position:relative;
  
  .container {
  position: absolute;
  top: 30%;
  left: 30%;
}

 
  
`;



const Login = () => {

  let history = useHistory();
  const GlobalStore = useContext(GobalStoreContext);


  return  (
    <Divform>
      <div className='container'>
       Login
      </div>
    </Divform>
  );
};

export default observer(Login);
