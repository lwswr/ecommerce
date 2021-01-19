import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppState } from "./appSlice";

const BasketBox = styled.div`
  display: flex;
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
    color: white;
  }
`;

export const BasketNav = ({
  toggle,
}: {
  toggle: (toggle: boolean) => void;
}) => {
  const { toggleBasket } = useSelector(selectState);
  return <BasketBox onClick={() => toggle(toggleBasket)}>Basket</BasketBox>;
};

const selectState = ({ state }: { state: AppState }) => state;
