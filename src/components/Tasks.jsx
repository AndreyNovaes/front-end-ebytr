import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Select,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
  DeleteIcon, EditIcon, CheckIcon, CheckCircleIcon, CloseIcon, ArrowRightIcon, Search2Icon,
} from '@chakra-ui/icons';
import {
  getAll, deleteById, updateById, updateStatusById,
} from '../services/requests';

export default function Tasks() {
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');
  const [idToEdit, setIdToEdit] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [orderDirection, setOrderDirection] = React.useState('asc');
  const { onOpen, isOpen, onClose } = useDisclosure();

  const getAllTasks = async () => {
    try {
      const response = await getAll({ orderBy, orderDirection });
      setTasks(response.response);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteById(id);
      getAllTasks();
    } catch (error) {
      setIsError(true);
    }
  };

  const handleEditTask = async (id, name, description) => {
    try {
      const body = { name, description };
      await updateById(id, body);
      getAllTasks();
    } catch (error) {
      setIsError(true);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatusById(id, status);
      getAllTasks();
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <Flex direction="column" align="center" justify="center">
      <Heading as="h1" size="xl">Tarefas</Heading>
      <Flex direction="row" justify="space-between" align="center">
        <FormControl>
          <FormLabel htmlFor="order-by">Ordenar por</FormLabel>
          <Select id="order-by" name="order-by" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="name">Nome</option>
            <option value="status">Status</option>
            <option value="createdAt">Data de Criação</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="order-direction">Ordem</FormLabel>
          <Select id="order-direction" name="order-direction" value={orderDirection} onChange={(e) => setOrderDirection(e.target.value)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel
            htmlFor="search"
          >
            Ordenar
          </FormLabel>
          <Button
            leftIcon={<Search2Icon />}
            onClick={getAllTasks}
          >
            Ordenar
          </Button>
        </FormControl>
      </Flex>
      <OrderedList spacing={4}>
        {isLoading ? (<Spinner />) : (
          tasks && tasks.map((task) => (
            <ListItem key={task.id}>
              <Flex direction="row" align="center" justify="space-between">
                <Flex direction="row" align="center" justify="center">
                  <Heading as="h3" size="sm">{task.name}</Heading>
                </Flex>
                <Flex direction="row" align="center" justify="center">
                  <IconButton
                    onClick={() => {
                      setIdToEdit(task.id);
                      setNewName(task.name);
                      setNewDescription(task.description);
                      onOpen();
                    }}
                    icon={<EditIcon />}
                  />
                  <IconButton
                    onClick={() => handleDeleteTask(task.id)}
                    icon={<DeleteIcon />}
                  />
                  <IconButton
                    onClick={() => handleStatusChange(task.id, task.status === 'pending' || task.status === 'ongoing' ? 'finished' : 'pending')}
                    icon={task.status === 'pending' || task.status === 'ongoing' ? <CheckIcon /> : <CheckCircleIcon />}
                  />
                  <IconButton
                    onClick={() => { handleStatusChange(task.id, task.status === 'pending' || task.status === 'finished' ? 'ongoing' : 'pending'); }}
                    icon={task.status === 'pending' || task.status === 'finished' ? <ArrowRightIcon /> : <CloseIcon />}
                  />
                </Flex>
              </Flex>
            </ListItem>
          ))
        )}
      </OrderedList>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              onClick={() => {
                handleEditTask(idToEdit, newName, newDescription);
                onClose();
              }}
              colorScheme="blue"
              isLoading={isLoading}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isError && (
        <Heading as="h3" size="sm">
          Ocorreu um erro ao carregar as tarefas
        </Heading>
      )}
    </Flex>
  );
}
