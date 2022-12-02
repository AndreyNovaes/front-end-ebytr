import React from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { createOne } from '../services/requests';

export default function HandleTaskCreate() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const onSubmitNewTask = async () => {
    try {
      const body = { name, description };
      await createOne(body);
      onClose();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Button id="open-modal" leftIcon={<AddIcon />} onClick={onOpen}>Criar Nova Tarefa</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Nova Tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="new-task" onSubmit={onSubmitNewTask}>
              <FormControl>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <Input
                  id="description"
                  name="description"
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              type="submit"
              form="new-task"
              colorScheme="blue"
            >
              Criar Tarefa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
