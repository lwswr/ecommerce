import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreItem } from "./API";

export const sortOptions = ["sort by", "alphabetical", "price"] as const;

export type SortOption = typeof sortOptions[number];

export type BasketItem = {
  storeItem: StoreItem;
  quantity: number;
};

export type AppState = {
  storeItems: StoreItem[];
  storeItemsBuffer: StoreItem[];
  basketItems: BasketItem[];
  toggleBasket: boolean;
  togglePopUp: boolean;
  currentSortOption: SortOption;
  popUpItem: StoreItem;
};

const initialAppState: AppState = {
  storeItems: [],
  storeItemsBuffer: [],
  basketItems: [],
  toggleBasket: false,
  togglePopUp: false,
  currentSortOption: "sort by",
  popUpItem: {
    id: 1,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  },
};

const sortList = (arr: StoreItem[], key: SortOption) => {
  return key === "price"
    ? arr.slice(0).sort((a, b) => a.price - b.price)
    : arr.slice(0).sort((a, b) => a.title.localeCompare(b.title));
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: initialAppState,
  reducers: {
    // after api called on render payload of items is set to storeItems
    setData: (state, { payload }: PayloadAction<{ items: StoreItem[] }>) => {
      state.storeItems = payload.items;
      state.storeItemsBuffer = payload.items;
    },
    // uses id
    addItemToBasket: (
      state: AppState,
      { payload }: PayloadAction<{ id: number; qty: number }>
    ) => {
      if (payload.id) {
        const isAlreadyInBasket = state.basketItems.some(
          (item) => item.storeItem.id === payload.id
        );
        if (isAlreadyInBasket === false) {
          const index: number = state.storeItems.findIndex(
            (_item) => _item.id === payload.id
          );
          state.basketItems.push({
            storeItem: state.storeItems[index],
            quantity: payload.qty,
          });
        }
      }
    },
    removeItemFromBasket: (
      state,
      { payload }: PayloadAction<{ id: number }>
    ) => {
      if (payload.id) {
        const index: number = state.basketItems.findIndex(
          (item) => item.storeItem.id === payload.id
        );
        if (payload.id > -1) state.basketItems.splice(index, 1);
      }
    },
    toggleBasket: (state, { payload }: PayloadAction<{ toggle: boolean }>) => {
      state.toggleBasket = !payload.toggle;
    },
    togglePopUp: (
      state,
      { payload }: PayloadAction<{ toggle: boolean; id: number }>
    ) => {
      if (payload.id) {
        const index: number = state.storeItems.findIndex(
          (item) => item.id === payload.id
        );
        state.popUpItem = state.storeItems[index];
        state.togglePopUp = !payload.toggle;
      }
    },
    updateSortOption: (
      state,
      { payload }: PayloadAction<{ option: SortOption }>
    ) => {
      state.currentSortOption = payload.option;
      state.currentSortOption === "sort by"
        ? (state.storeItems = state.storeItemsBuffer)
        : (state.storeItems = sortList(
            state.storeItems,
            state.currentSortOption
          ));
    },
  },
});

export const {
  setData,
  addItemToBasket,
  removeItemFromBasket,
  toggleBasket,
  togglePopUp,
  updateSortOption,
} = appSlice.actions;

export default appSlice.reducer;
