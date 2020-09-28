import { useState, useEffect } from 'react';

const isEmpty = (array) => array.length === 0;

const ifUserHas = (inaktivBrukernotifikasjon) => (
  inaktivBrukernotifikasjon && !isEmpty(inaktivBrukernotifikasjon)
);

const useInngang = (inaktiveBeskjeder, inaktiveOppgaver, inaktiveInnbokser) => {
  const [visInngang, setVisInngang] = useState(false);

  useEffect(() => {
    setVisInngang(
      ifUserHas(inaktiveBeskjeder) || ifUserHas(inaktiveOppgaver) || ifUserHas(inaktiveInnbokser),
    );
  }, [inaktiveBeskjeder, inaktiveOppgaver, inaktiveInnbokser]);

  return [visInngang];
};

export default useInngang;
