import { useState, useEffect } from 'react';

const isEmpty = (array) => array.length === 0;

const ifUserHas = (inaktiveBrukernotifikasjoner) => (
  inaktiveBrukernotifikasjoner && inaktiveBrukernotifikasjoner.content && !isEmpty(inaktiveBrukernotifikasjoner.content)
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
