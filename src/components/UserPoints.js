import React from 'react'
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  min-height: 80px;
  max-height: 80px;
  justify-content: flex-end;
  padding: 20px 10px;
  align-items: center;
  font-size: 18px;
   
  i { margin-right: 10px; }
   
  @media(min-width: 768px) {
    font-size: 22px;
  }
`


function UserPoints({ current }) {
  return <Container>
    <i className="menu-icon menu-icon-diamond" />
    {current.context.points}
  </Container>;
}

export default UserPoints