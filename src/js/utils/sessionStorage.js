import log from './logger';

export const setStorageItem = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    log(e);
  }
};

export const getStorageItem = (key) => sessionStorage.getItem(key);
