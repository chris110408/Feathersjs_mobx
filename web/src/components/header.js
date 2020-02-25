import React from "react";
import { Menu, Icon, Spin, Dropdown, Avatar } from "antd";
import styled from "styled-components";
import { observer } from "mobx-react";

const DivRight = styled.div`
  padding: 0 1rem;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  .action {
    cursor: pointer;
    padding: 0 12px;
    display: inline-block;
    transition: all 0.3s;
    height: 100%;
    > i {
      font-size: 16px;
      vertical-align: middle;
      // color: @text-color;
    }
    &:hover,
    &:global(.ant-popover-open) {
      background: black;
    }
  }
  .search {
    padding: 0;
    margin: 0 12px;
    &:hover {
      background: transparent;
    }
  }
  .account {
    .avatar {
      margin: 20px 20px 20px 0;
      color: black;
      background: rgba(255, 255, 255, 0.85);
      vertical-align: middle;
    }
  }
`;

const GlobalHeader = ({ onHeadMenuClick, currentUser }) => {
  const menu = (
    <Menu selectedKeys={[]} onClick={onHeadMenuClick}>
      <Menu.Item>
        <Icon type='logout' />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <DivRight>
        {currentUser ? (
          <Dropdown overlay={menu}>
            <span className='action account'>
              <Avatar
                size='small'
                className='avatar'
                src={currentUser.avatar}
              />
              <span className='name'>Hello {currentUser.first_name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size='small' style={{ marginLeft: 8 }} />
        )}
      </DivRight>
    </div>
  );
};

export default observer(GlobalHeader);
