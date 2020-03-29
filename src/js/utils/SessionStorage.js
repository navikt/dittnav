
export const setStorageItem = (key, value) => {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getStorageItem = (key) => sessionStorage.getItem(key);
