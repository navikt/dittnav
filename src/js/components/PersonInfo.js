import React from 'react';
import Personikon from '../../assets/person.svg';
import { useIdent, useNavn } from '../hooks/api/usePerson';

const PersonInfo = () => {
  const [{ data: personNavn, isError: navnFailed }] = useNavn();
  const [{ data: personIdent, isError: personIdentFailed }] = useIdent(false);

  if ((!personNavn && !personIdent) || personIdentFailed) {
    return null;
  }

  const navnOrIdent = navnFailed ? personIdent.content.ident : personNavn.content.navn.toLowerCase();

  return (
    <div className="person-info">
      <img className="person-info__ikon" src={Personikon} alt="" />
      <h1>{navnOrIdent}</h1>
    </div>
  );
};

export default PersonInfo;
