import * as React from "react";
import { StoreItem } from "./API";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StoreItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 1rem;
  margin: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  z-index: 10;
  background: white;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Button = styled.button`
  background: rgb(0, 137, 216);
  border: 1px solid rgb(0, 137, 216);
  transition: 0.2s;
  color: white;
  border-radius: 5px;
  padding: 5px;
  margin-left: 10px;
  :hover {
    background: rgb(0, 90, 173);
    border: 1px solid rgb(0, 90, 173);
  }
`;

const NumberInput = styled.input`
  width: 3rem;
  border: 1px solid rgb(0, 137, 216);
  border-radius: 5px;
  padding: 5px;
  transition: 0.2s;
  :hover {
    box-shadow: rgba(0, 90, 173, 0.2) 0px 3px 6px,
      rgba(0, 90, 173, 0.2) 0px 3px 6px;
  }
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: row;
`;

const StoreItemTitle = styled.div`
  font-size: 1.2rem;
  :hover {
    text-decoration: underline;
  }
`;

const StoreItemPrice = styled.div`
  font-size: 1rem;
  color: rgb(80, 80, 80);
`;

export const StoreItemComp = ({
  storeItem,
  addItem,
  togglePU,
}: {
  storeItem: StoreItem;
  addItem: (id: number, qty: number) => void;
  togglePU: (toggle: boolean, id: number) => void;
}) => {
  const togglePopUpView = useSelector(selectPopUpToggle);
  const [qty, setQty] = React.useState<number>(1);

  return (
    <StoreItemContainer key={storeItem.id}>
      <Column>
        <StoreItemTitle onClick={() => togglePU(togglePopUpView, storeItem.id)}>
          {storeItem.title}
        </StoreItemTitle>
        <StoreItemPrice>£{storeItem.price.toFixed(2)}</StoreItemPrice>
        <Inputs>
          <NumberInput
            type="number"
            value={qty}
            onChange={(e) => setQty(parseInt(e.target.value))}
          />
          <Button
            onClick={() => {
              if (qty > 0) {
                addItem(storeItem.id, qty);
                setQty(1);
              }
            }}
          >
            Add to Basket
          </Button>
        </Inputs>
      </Column>

      <img
        src={storeItem.image}
        alt=""
        style={{ height: "120px", width: "90px" }}
      />
    </StoreItemContainer>
  );
};

const selectPopUpToggle = (togglePopUp: boolean) => togglePopUp;
