import { database } from './config';

export const menuRef = database.ref('menu');

export const addMenuToFirebase = name => {
  const key = menuRef.push().key;
  return menuRef.child(key).set({
    name,
    content: 'todo',
    key
  });
};

export const removeMenuFromFirebase = key => {
  menuRef.child(key).remove();
};
