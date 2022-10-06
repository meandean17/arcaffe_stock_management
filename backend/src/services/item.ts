import ItemModel from '../models/item';
import { Item } from '../types';

const getAllItems = async () => {
  const items = await ItemModel.find({});
  return items;
};

const addItem = async (item: Item) => {
  const newItem = await ItemModel.create(item);
  return newItem;
};

const updateItem = async (itemId: string, item: Item) => {
  const updatedItem = await ItemModel.findByIdAndUpdate(itemId, item);
  return updatedItem;
}

const deleteItem = async (itemId: string) => {
  await ItemModel.findByIdAndDelete(itemId);
}

export default {
  addItem,
  getAllItems,
  updateItem,
  deleteItem,
};
