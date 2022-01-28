import { IItem, IItemWithId } from "../../domain/Item";
import { itemsLocalStorageService } from "./itemsLocalStorageService";
import { v4 as uuidv4 } from 'uuid';

export const itemsServices = () => {
  const itemsLocalStorage = itemsLocalStorageService();

  return {
    loadItems: async () => {return await itemsLocalStorage.load()},
    deleteItemCase: async (deletedId: IItemWithId['id']) => {
      const items = await itemsLocalStorage.load();
      const newItems = items.filter((item) => item.id !== deletedId);
      itemsLocalStorage.save(newItems);
    },
    updateItemCase: async (updatedItem: IItemWithId) => {
      const items = await itemsLocalStorage.load();
      const itemIndex = items.findIndex(item => item.id === updatedItem.id);
      items[itemIndex] = updatedItem;

      await itemsLocalStorage.save(items);

      return updatedItem;
    },
    createNewItemCase: async (newItem: IItem) => {
      const items = await itemsLocalStorage.load();
      const itemWithId = {id: uuidv4(), ...newItem};
      items.push(itemWithId);

      await itemsLocalStorage.save(items);

      return itemWithId;
    }
  }
}