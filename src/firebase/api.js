import { database } from './config';

export const menuRef = database.ref('menu');

export const addMenuToFirebase = name => {
  menuRef.push({
    name,
    content: 'todo'
  });
};
