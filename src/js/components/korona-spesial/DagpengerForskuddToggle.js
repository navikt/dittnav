import { v4 } from 'uuid';
import { getStorageItem, setStorageItem } from '../../utils/SessionStorage';

const idKey = 'forskudd-dagpenger-session-id';
const toggleCacheKey = 'forskudd-dagpenger-vises';
const apiUrl = 'https://www-q1.nav.no/dagpenger/forskudd-api/api/enabled/anonymous';
const toggleName = 'dagpenger.forskudd.entry.enabled';

const reqBody = (id) => ({ sessionId: id, toggles: [toggleName] });

const postAndCallbackOnResponse = (url, content, callback) =>
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
      console.log(r);
      callback(r[toggleName]);
    })
    .catch(e => console.log("Error from forskudd", e));

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
  const toggleFromStorage = getStorageItem(toggleCacheKey);
  if (toggleFromStorage) {
    skalVisesCallback(toggleFromStorage === "true");
    return;
  }

  const sessionId = getForskuddSessionId();
  postAndCallbackOnResponse(apiUrl, reqBody(sessionId), skalVisesCallback);
};
