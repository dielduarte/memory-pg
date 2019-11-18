import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  max-height: 174px;
  padding: 0 10px;

  @media (min-width: 768px) {
    max-height: 116px;
  }
`;

const IconContainer = styled.button`
  border: 1px solid transparent;
  width: calc(100% / 4);
  min-width: 32px;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;

  &:hover {
    border: 1px solid #fff;
  }

  ${props =>
    props.active &&
    `
    border: 1px solid #fff;
  `}

  @media(min-width: 768px) {
    width: calc(100% / 6);
  }
`;

function IconsGrid({ current, send }) {
  const { context } = current;

  const handleAddUserChoice = iconId => () =>
    send({ type: 'ADD_USER_CHOICE', payload: { iconId } });
  const isIconActive = it => context.userSequence.includes(it);

  return (
    <Container>
      {context.icons.map((it, key) => (
        <IconContainer
          key={key}
          onClick={handleAddUserChoice(it)}
          active={isIconActive(it) || context.activeIconIndex === key}
          data-testid={it}
        >
          <i className={`icon ${it}`} />
        </IconContainer>
      ))}
    </Container>
  );
}

export default IconsGrid;
