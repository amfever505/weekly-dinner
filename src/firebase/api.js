import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { list } from 'rxfire/database';
import { authState } from 'rxfire/auth';
import { map } from 'rxjs/operators';

import { config } from './config';

const app = firebase.initializeApp(config);
const database = firebase.database();
const auth = firebase.auth();
export const getUid = () => auth.currentUser.uid;

// 加入資料用function

export const menuRef = database.ref('menu');

export const addMenuToFirebase = ({ name, content }) => {
  return menuRef.child(getUid()).push({
    name,
    content,
  });
};

export const updateMenuToFirebase = ({ name, content, key }) => {
  const editedData = {
    name,
    content,
  };
  console.log(editedData);
  return menuRef.child(getUid()).child(key).update(editedData);
};

export const getMenuList = () => {
  return list(menuRef.child(getUid())).pipe(
    map((changes) =>
      changes.map((c) => {
        return { key: c.snapshot.key, ...c.snapshot.val() };
      })
    )
  );
};

export const removeMenuFromFirebase = (key) => {
  menuRef.child(getUid()).child(key).remove();
};

export const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  auth.signInWithRedirect(provider);
};

// 登入用function

export const checkLogin = () => authState(app.auth());

export const logout = () =>
  auth
    .signOut()
    .then(() => {
      console.log('logout success!');
    })
    .catch((error) => {
      console.log(error);
    });
