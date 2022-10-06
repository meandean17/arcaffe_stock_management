import express from 'express';
import { itemController } from '../controllers';

const itemsRouter = express.Router();

itemsRouter.post('/', itemController.addItem);

itemsRouter.get('/', itemController.getAllItems);

itemsRouter.put('/:itemId', itemController.updateItem);

itemsRouter.delete('/:itemId', itemController.deleteItem);

export default itemsRouter;
