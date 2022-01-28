import { IItemWithId } from "../../domain/Item";
import { localStorageService } from "./localStorageService"

export const itemsLocalStorageService = () => {
  const itemsLocalStorage = localStorageService({key: 'items' });

  return {
    load: async () => {const items = JSON.parse(itemsLocalStorage.load() ?? '[]') as IItemWithId[]; console.log(items); return items},
    save: async (items: IItemWithId[]) => {
      itemsLocalStorage.save(JSON.stringify(items));
      return items;
    }
  }
}