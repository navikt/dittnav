import { v4 } from 'uuid';
import { getStorageItem, setStorageItem } from '../../utils/SessionStorage';
import Cookies from 'js-cookie';
import log from "../../utils/Logger";

const sessionIdKey = 'forskudd-dagpenger-session-id';
const toggleCookieKey = 'forskudd-dagpenger-vises';
const apiUrl = `${window.env.NAVNO_URL}/dagpenger/forskudd-api/api/enabled/anonymous`;
const toggleName = 'dagpenger.forskudd.entry.enabled';
const toggleDefault = false;
const unleashTimeout = 3000;

const timeoutPromise = (ms, msg) =>
  new Promise((_, rej) => setTimeout(() => rej(msg), ms));

const postThenCallbackToggleStatus = (url, sessionId, callback) =>
  Promise.race([timeoutPromise(unleashTimeout, "Unleash timeout"),
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId: sessionId, toggles: [toggleName] }),
    })
      .then(r => r.ok ? r : new Error(r.status.toString()))
      .then(r => r.json())
      .then(r => {
        const toggleStatus = r[toggleName];
        setToggleCookies(toggleStatus, sessionId);
        callback(toggleStatus);
      })
      .catch(e => {
        log(`Error: ${e}`);
        callback(toggleDefault);
      })]);

const setToggleCookies = (toggleStatus, sessionId) => {
  Cookies.set(toggleCookieKey, toggleStatus, { expires: 1 / 24 });
  Cookies.set(sessionIdKey, sessionId, { expires: 1 / 24 });
};

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
    setStorageItem(sessionIdKey, Cookies.get(sessionIdKey));
    skalVisesCallback(toggleFromCookie === "true");
    return;
  }

  const sessionId = getForskuddSessionId();
  postThenCallbackToggleStatus(apiUrl, sessionId, skalVisesCallback);
};
