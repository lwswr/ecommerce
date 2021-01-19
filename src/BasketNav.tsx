import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "./appSlice";

const BasketBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: absolute;
  z-index: 12;
  height: 4rem;
  width: 4rem;
  margin-top: 30px;
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
`;

const Title = styled.div`
  color: #005f9e;
`;

const Count = styled.div`
  position: absolute;
  text-align: center;
  margin: 20px 0 0 45px;
  padding: 5px;
  width: 1rem;
  border-radius: 25px;
  background: #ee9b00;
  color: white;
  z-index: 13;
`;

export const BasketNav = ({
  toggle,
}: {
  toggle: (toggle: boolean) => void;
}) => {
  const { toggleBasket, basketItems } = useSelector(selectState);
  return (
    <div style={{ width: "6rem", marginRight: "3px" }}>
      {basketItems.length > 0 ? <Count>{basketItems.length}</Count> : null}
      <BasketBox onClick={() => toggle(toggleBasket)}>
        <Title>Basket</Title>
      </BasketBox>
    </div>
  );
};

const selectState = ({ state }: { state: AppState }) => state;
