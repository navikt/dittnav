import { useState, useEffect } from 'react';

const isEmpty = (array) => array.length === 0;

const checkInaktiveBeskjeder = (inaktiveBeskjeder) => (
  inaktiveBeskjeder && !isEmpty(inaktiveBeskjeder)
);

const checkInaktiveOppgaver = (inaktiveOppgaver) => (
  inaktiveOppgaver && !isEmpty(inaktiveOppgaver)
);

const checkInaktiveInnbokser = (inaktiveInnbokser) => (
  inaktiveInnbokser && !isEmpty(inaktiveInnbokser)
);

const useInngang = (inaktiveBeskjeder, inaktiveOppgaver, inaktiveInnbokser) => {
  const [visInngang, setVisInngang] = useState(false);

  useEffect(() => {
    setVisInngang(
      checkInaktiveBeskjeder(inaktiveBeskjeder)
      && checkInaktiveOppgaver(inaktiveOppgaver)
      && checkInaktiveInnbokser(inaktiveInnbokser),
    );
  }, [inaktiveBeskjeder, inaktiveOppgaver, inaktiveInnbokser]);

  return [visInngang];
};

export default useInngang;
