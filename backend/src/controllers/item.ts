import { NextFunction, Request, Response } from 'express';
import { itemService } from '../services';
import { Item } from '../types';

const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await itemService.getAllItems();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const addItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = req.body as Item;
    const addedItem = await itemService.addItem(item);
    res.status(201).json(addedItem);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.itemId as string;
    const item = req.body as Item;
    await itemService.updateItem(id, item);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.itemId as string;
    await itemService.deleteItem(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export default { getAllItems, addItem, updateItem, deleteItem };
