import { IItem, IItemWithId } from "./ItemEntities";
import ItemValidations from "./validations";

export type createItemServiceType = (item: IItem) => Promise<IItemWithId>;
export type loadItemsServiceType = () => Promise<IItemWithId[]>;
export type deleteItemServiceType = (itemId: IItemWithId['id']) => Promise<void>;
export type updatetemServiceType = (item: IItemWithId) => Promise<IItemWithId>;

export enum EItemMethods {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE'
}

export const createNewItemCase = async (createItemService: createItemServiceType, totalItems: IItem[], newItem: IItem): Promise<IItemWithId> => {
  const validatedItem = await ItemValidations(EItemMethods.CREATE, totalItems, newItem);
  return createItemService(validatedItem);
};

export const deleteItemCase = async(deleteItemService: deleteItemServiceType, item: IItemWithId): Promise<void> => {
  deleteItemService(item.id);
};

export const updateItemCase = async (updateItemService: updatetemServiceType, item: IItemWithId): Promise<IItemWithId> => {
  const updatedItem = {...item, isCompleted: true};
  return updateItemService(updatedItem);
};

export const loadItems = async (loadItemsService: loadItemsServiceType): Promise<IItemWithId[]> => loadItemsService();