import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import ColorModeSwitcher from './components/ColorModeSwitcher';
import TaskCreator from './components/TaskCreator';
import Tasks from './components/Tasks';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
      <TaskCreator />
      <Tasks />
    </ChakraProvider>
  );
}

export default App;
