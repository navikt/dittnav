import { v4 } from 'uuid';
import { getStorageItem, setStorageItem } from '../../utils/SessionStorage';
import Cookies from 'js-cookie';

const idKey = 'forskudd-dagpenger-session-id';
const toggleCacheKey = 'forskudd-dagpenger-vises';
const apiUrl = 'https://www-q1.nav.no/dagpenger/forskudd-api/api/enabled/anonymous';
const toggleName = 'dagpenger.forskudd.entry.enabled';

const reqBody = (id) => ({ sessionId: id, toggles: [toggleName] });

const postThenCallbackToggleStatus = (url, content, callback) =>
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })
    .then(r => r.ok ? r : new Error(r.status))
    .then(r => r.json())
    .then(r => {
      console.log("Forskudd response:", r);
      const toggleStatus = r[toggleName];
      Cookies.set(toggleCacheKey, toggleStatus, { expires: 1 / 24 });
      callback(toggleStatus);
    })
    .catch(e => console.log("Error from forskudd:", e));

const getForskuddSessionId = () => {
  const idFromStorage = getStorageItem(idKey);
  if (!idFromStorage) {
    const newId = v4();
    setStorageItem(idKey, newId);
    return newId;
  }
  return idFromStorage;
};

export const skalViseForskuddLenke = (skalVisesCallback) => {
  // const toggleFromStorage = Cookies.get(toggleCacheKey);
  // if (toggleFromStorage) {
  //   skalVisesCallback(toggleFromStorage === "true");
  //   return;
  // }

  const sessionId = getForskuddSessionId();
  postThenCallbackToggleStatus(apiUrl, reqBody(sessionId), skalVisesCallback);
};
