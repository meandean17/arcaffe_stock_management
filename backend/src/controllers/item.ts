import { NextFunction, Request, Response } from 'express';
import { UpdateWithAggregationPipeline } from 'mongoose';
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
    const update = req.body.update as UpdateWithAggregationPipeline;
    await itemService.updateItem(id, update);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const updateItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemIds = req.body.itemIds as string[];
    const update = req.body.update as UpdateWithAggregationPipeline;
    await itemService.updateItems(itemIds, update);
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

export default { getAllItems, addItem, updateItem, updateItems, deleteItem };