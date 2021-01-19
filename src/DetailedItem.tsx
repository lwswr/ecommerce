import * as React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { StoreItem } from "./API";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  width: 50%;
  height: 75vh;
  padding: 1rem 3rem;
  z-index: 12;
  background: rgb(240, 239, 239);
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const ItemWindow = styled.div`
  display: flex;
  flex-direction: column;
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

const Button = styled.button`
  background: rgb(0, 137, 216);
  border: 1px solid rgb(0, 137, 216);
  transition: 0.2s;
  color: white;
  border-radius: 5px;
  padding: 5px;
  margin-right: 1rem;
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
  margin-right: 1rem;
  transition: 0.2s;
  :hover {
    box-shadow: rgba(0, 90, 173, 0.2) 0px 3px 6px,
      rgba(0, 90, 173, 0.2) 0px 3px 6px;
  }
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid lightgrey;
  padding-top: 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Desc = styled.div`
  font-size: 1rem;
`;

const Price = styled.div`
  padding: 5px;
  margin-right: 1rem;
`;

const ProductInterface = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DetailedItem = ({
  item,
  addItem,
  togglePU,
}: {
  item: StoreItem;
  addItem: (id: number, qty: number) => void;
  togglePU: (toggle: boolean, id: number) => void;
}) => {
  const togglePopUpView = useSelector(selectToggle);
  const [qty, setQty] = React.useState<number>(1);
  return (
    <ItemContainer>
      <ItemWindow>
        <Title>{item.title}</Title>
        <Desc>{item.description}</Desc>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={item.image}
            alt=""
            style={{ width: "25%", height: "auto", padding: "20px 0 20px 0" }}
          />
        </div>
        <Inputs>
          <ProductInterface>
            <Price>£{item.price.toFixed(2)}</Price>
            <NumberInput
              type="number"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
            />
            <Button
              onClick={() => {
                if (qty > 0) {
                  addItem(item.id, qty);
                  setQty(1);
                }
              }}
            >
              Add to Basket
            </Button>
          </ProductInterface>
          <Button onClick={() => togglePU(togglePopUpView, item.id)}>
            Back
          </Button>
        </Inputs>
      </ItemWindow>
    </ItemContainer>
  );
};

const selectToggle = (togglePopUp: boolean) => togglePopUp;
