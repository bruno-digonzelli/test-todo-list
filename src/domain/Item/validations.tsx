import { IItem } from "./ItemEntities";
import { EItemMethods } from "./ItemUseCases";

function ItemValidations<T extends IItem> (method: EItemMethods, totalItems: IItem[], item: T): T {
  switch (method) {
    case 'CREATE':
      validateItemHasText(item.text);
      validateItemIsUnique(totalItems, item);

      return item;
    default:
      return item;
  }
}

const validateItemHasText = (itemText: IItem['text']) => {
  if(!itemText) {
    throw new Error('Item requires text');
  }

  return itemText;
};

const validateItemIsUnique = (totalItems: IItem[], newItem: IItem) => {
  const isItemExistent = totalItems.find((item) => item.text === newItem.text);

  if(isItemExistent) {
    throw new Error('Item with that text already exists.');
  }

  return newItem;
}

export default ItemValidations;