import React, { useContext, useEffect } from "react";
import { GobalStoreContext } from "../store";
import {  useHistory } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import SiderMenu from "../components/sider-menu";
import GlobalHeader from "../components/header";
const { Header, Content ,Footer} = Layout;



const SecurityLayout = ({ collapsible, collapsed, children }) => {
  const GlobalStore = useContext(GobalStoreContext);
  let history = useHistory();
  useEffect(() => {
    if (!GlobalStore.token) {
      history.push("/login");
    }
  }, []);

  const onHeadMenuClick = () => {
    GlobalStore.token = null;
    GlobalStore.currentUser = null;
    history.push("/login");
  };

   return  ( <Layout style={{ minHeight: "100vh" }}>
        <SiderMenu collapsible collapsed={collapsed} />

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <GlobalHeader
                currentUser={GlobalStore.currentUser}
                onHeadMenuClick={onHeadMenuClick}
            />
          </Header>

          <Content
              style={{ margin: "24px 24px 0", height: "100%", width: "100%" }}
          >
            {children}
          </Content>

            <Footer style={{ textAlign: "center" }}>
                Create By Chris For Interview
            </Footer>
        </Layout>
      </Layout>)



};

export default SecurityLayout;
