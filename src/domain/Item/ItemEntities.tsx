export interface IItem {
  text: string;
  isCompleted: boolean;
}

export interface IItemWithId extends IItem {
  id: string;
}