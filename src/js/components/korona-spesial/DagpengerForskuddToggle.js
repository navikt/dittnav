import { v4 } from 'uuid';
import { getStorageItem, setStorageItem } from '../../utils/SessionStorage';
import Cookies from 'js-cookie';
import log from "../../utils/Logger";

const sessionIdKey = 'forskudd-dagpenger-session-id';
const toggleCookieKey = 'forskudd-dagpenger-vises';
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
      const toggleStatus = r[toggleName];
      Cookies.set(toggleCookieKey, toggleStatus, { expires: 1 / 24 });
      callback(toggleStatus);
    })
    .catch(e => log(`Error: ${e}`));

const getForskuddSessionId = () => {
  const idFromStorage = getStorageItem(sessionIdKey);
  if (!idFromStorage) {
    const newId = v4();
    setStorageItem(sessionIdKey, newId);
    return newId;
  }
  return idFromStorage;
};

export const skalViseForskuddLenke = (skalVisesCallback) => {
  const toggleFromCookie = Cookies.get(toggleCookieKey);
  if (toggleFromCookie) {
    skalVisesCallback(toggleFromCookie === "true");
    return;
  }

  const sessionId = getForskuddSessionId();
  postThenCallbackToggleStatus(apiUrl, reqBody(sessionId), skalVisesCallback);
};
