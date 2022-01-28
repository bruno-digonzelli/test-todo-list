import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, IconButton } from '@chakra-ui/button';
import { Table, Td, Tr } from '@chakra-ui/table';
import {CheckIcon, DeleteIcon} from '@chakra-ui/icons';
import { Flex, Heading, Box } from '@chakra-ui/layout';
import useSWR from 'swr';
import produce from 'immer';
import { Spinner } from '@chakra-ui/spinner';
import { createItemServiceType, createNewItemCase, deleteItemCase, deleteItemServiceType, IItemWithId, loadItems, loadItemsServiceType, updateItemCase, updatetemServiceType } from '../../../domain/Item';
import { Input, Tbody } from '@chakra-ui/react';

interface IItemListProps {
  loadItemsService: loadItemsServiceType; 
  updateItemsService: updatetemServiceType;
  deleteItemsService: deleteItemServiceType;
  createItemService: createItemServiceType;
}
 
const ItemList = ({loadItemsService, updateItemsService, deleteItemsService, createItemService}: IItemListProps): JSX.Element => {
  const {data: items, mutate}= useSWR('items', async () => {
    const items = await loadItems(loadItemsService)

    return items;
  }, {
    revalidateOnFocus: false
  })

  const handleDeleteItem = async (itemIndex: number) => {
    if(!items) return;
    const item = items[itemIndex];
    if(!item) return;

    mutate(produce(items, (itemsDraft) => {
      itemsDraft.splice(itemIndex, 1);
    }))

    try {
      await deleteItemCase(deleteItemsService, item)
      await mutate();
    } catch (e) {
      alert('Unable to delete item');
    }
  }

  const handleUpdateItem = async (itemIndex: number) => {
    if(!items) return;
    const updatedItem: IItemWithId = {...items[itemIndex], isCompleted: true};

    mutate(produce(items, (itemsDraft) => {
      itemsDraft[itemIndex] = {...itemsDraft[itemIndex], isCompleted: true};
    }), false);

    try {
      await updateItemCase(updateItemsService, updatedItem);
      await mutate();
    } catch (error) {
      alert(error);
    }
  };


  // Form
  const [newItemName, setNewItemName] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemName(e.target.value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!items) return;

    try {
      await createNewItemCase(createItemService, items, {text: newItemName, isCompleted: false})
      await mutate();
    } catch (e) {
      alert(e);
    }

    setNewItemName('');
  }

  return (
    <>
      {items ? (
        <Box>
          <Table>
            <Tbody>
              {items.map((item, index) => {
                const {text, isCompleted} = item;

                return (
                  <Tr key={item.id} bg={isCompleted ? 'gray.200': 'blue.200'}>
                    <Td width="80%">
                      <Heading fontSize="3xl" textDecoration={isCompleted ? 'line-through' : 'none'}>{text}</Heading>
                    </Td>
                    <Td padding="1">
                      <IconButton aria-label={`Delete item ${text}`} icon={<DeleteIcon />} onClick={() => handleDeleteItem(index)} isDisabled={isCompleted} />
                    </Td>
                    <Td padding="1">
                      <IconButton aria-label={`Complete item ${text}`} icon={<CheckIcon />} onClick={() => handleUpdateItem(index)} isDisabled={isCompleted} />
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <Flex width="full" alignItems="center" justifyContent="center" height="container.sm">
          <Spinner size="xl" color="pink" thickness="6px" />
        </Flex>
      )
    }
    <form onSubmit={handleSubmit}>
      <Flex bg="blue.100" padding="16px 24px" justifyContent="space-between">
        <Input type="text" placeholder='Add an item' onChange={handleChange} value={newItemName} marginRight="10px" />
        <Button type='submit'>Send</Button>
      </Flex>
    </form>
  </>
  );
};
 
export default ItemList;