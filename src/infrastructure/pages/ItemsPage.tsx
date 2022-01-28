import * as React from 'react';
import { Container, Box, Heading } from '@chakra-ui/layout';
import ItemList from '../../application/ItemList/src';
import { itemsServices } from '../../application/services/itemsServices';

const ItemsPage = (): JSX.Element => {
  return (
    <Container maxW="xl" centerContent>

        {/* Molecule */}
        <Box as="header" padding="8">
          <Heading as="h1">To-do list</Heading>
        </Box>
        
        
        <Container maxW='container.xl'>
          <ItemList
            deleteItemsService={itemsServices().deleteItemCase}
            loadItemsService={itemsServices().loadItems}
            updateItemsService={itemsServices().updateItemCase}
            createItemService={itemsServices().createNewItemCase}
          />
        </Container>
      </Container>
  );
}
 
export default ItemsPage;