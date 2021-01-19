import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "./appSlice";

const BasketBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  height: 4rem;
  width: 4rem;
  margin: 20px 35px 0 0;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: 0.2s;
  :hover {
    background: #0099ff;
  }
  :hover :nth-child(1) {
    color: white;
  }
  :hover :nth-child(2) {
    color: #0099ff;
    background: white;
  }
`;

const Title = styled.div`
  color: #005f9e;
`;

const Count = styled.div`
  text-align: center;
  margin: 2px;
  padding: 5px;
  width: 1rem;
  border-radius: 25px;
  background: #0099ff;
  color: white;
`;

export const BasketNav = ({
  toggle,
}: {
  toggle: (toggle: boolean) => void;
}) => {
  const { toggleBasket, basketItems } = useSelector(selectState);
  return (
    <BasketBox onClick={() => toggle(toggleBasket)}>
      <Title>Basket</Title>
      <Count>{basketItems.length}</Count>
    </BasketBox>
  );
};

const selectState = ({ state }: { state: AppState }) => state;
