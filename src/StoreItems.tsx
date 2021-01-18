import * as React from "react";
import { StoreItem } from "./API";
import { StoreItemComp } from "./StoreItemComp";
import styled from "styled-components";

const StoreItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  width: 50%;
  margin: auto;
  padding: 1rem 3rem;
  z-index: 12;
  position: relative;
  background: rgb(240, 239, 239);
`;

export const StoreItems = ({
  storeItems,
  addItem,
  togglePU,
}: {
  storeItems: StoreItem[];
  addItem: (id: number, qty: number) => void;
  togglePU: (toggle: boolean, id: number) => void;
}) => {
  return (
    <StoreItemsContainer>
      {storeItems.map((storeItem) => {
        return (
          <StoreItemComp
            key={storeItem.id}
            storeItem={storeItem}
            addItem={addItem}
            togglePU={togglePU}
          />
        );
      })}
    </StoreItemsContainer>
  );
};
