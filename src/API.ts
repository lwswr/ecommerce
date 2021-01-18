import axios from "axios";

export type StoreItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

const API_URL: string = `https://fakestoreapi.com/products`;

export const getAPIData = async () => {
  const response = await axios.get<StoreItem[]>(API_URL);
  return response.data;
};
