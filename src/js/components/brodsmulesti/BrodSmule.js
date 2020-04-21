import React from 'react';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const finnNaavaerendeSide = (pathname) => pathname.split('/').pop();

const BrodSmule = () => {
  const location = useLocation();
  const naavaerendeSide = finnNaavaerendeSide(location.pathname);

  return (
    <li className="brodsmule">
      <span>
        <FormattedMessage id={`brodsmulesti.${naavaerendeSide}`} />
      </span>
    </li>
  );
};

export default BrodSmule;
