import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import ScrollToTop from './components/scroll/ScrollToTop';
import Config from './globalConfig';
import '../less/index.less';
import Api from './Api';
import useModal from './hooks/useModal';
import useStore from './hooks/useStore';
import Home from './pages/Home/Home';
import Varslinger from './pages/Varslinger/Varslinger';

// TODO : add this to useModal.
const checkIfModalShouldBeToggled = (headers, toggleModal) => {
  if (Api.tokenExpiresSoon(headers)) {
    toggleModal();
  }
};

const App = () => {
  const [visModal, toggleModal, handleModal] = useModal();
  const { addBeskjeder, addInaktiveBeskjeder, addOppgaver, addInnbokser, addInaktiveOppgaver } = useStore();
  const { addInaktiveInnbokser, addInnloggingsstatus, addOppfolging, addMeldekort, addNavn, addIdent, } = useStore();
  const { addPaabegynteSoknader, addMeldinger, addSakstema, setError } = useStore();

  useEffect(
    () => {
      Api.fetchBeskjeder()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addBeskjeder(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchOppgaver()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addOppgaver(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInnbokser()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addInnbokser(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveBeskjeder()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addInaktiveBeskjeder(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveOppgaver()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addInaktiveOppgaver(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveInnbokser()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addInaktiveInnbokser(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInnloggingsstatus()
        .then(([result]) => {
          addInnloggingsstatus(result);
        })
        .catch(() => {
          setError();
        });
    }, [],
  );

  useEffect(
    () => {
      Api.fetchOppfolging()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addOppfolging(result);
        }).catch(() => {
          setError();
        });

      Api.fetchMeldekort()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addMeldekort(result);
        }).catch(() => {
          setError();
        });

      Api.fetchPersonNavn()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addNavn(result);
        }).catch(() => {
          Api.fetchPersonIdent()
            .then(result => {
              addIdent(result);
              setError();
            })
            .catch(() => {
              setError();
            });
        });

      Api.fetchSaker()
        .then(([result, headers]) => {
          const { feilendeBaksystem } = result;
          if (feilendeBaksystem.length > 0) {
            addPaabegynteSoknader(result);
            setError();
          } else {
            checkIfModalShouldBeToggled(headers, toggleModal);
            addPaabegynteSoknader(result);
          }
        }).catch(() => {
          setError();
        });

      Api.fetchMeldinger()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addMeldinger(result);
        }).catch(() => {
          setError();
        });

      Api.fetchSakstema()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleModal);
          addSakstema(result);
        }).catch(() => {
          setError();
        });
    }, [],
  );

  return (
    <Router basename="/person">
      <ScrollToTop />
      <Switch>
        <Route
          path="/dittnav"
          exact
          component={Home}
        />
        <Route
          path="/dittnav/varslinger"
          exact
          component={Varslinger}
        />
        {Config.TEST_SIDE_FEATURE_TOGGLE && (
          <Route
            path="/dittnav/hendelser"
            exact
            component={HendelserTestSide}
          />
        )}
        <Route
          path="/dittnav*"
          exact
          component={Home}
        />
      </Switch>
    </Router>
  );
};

export default App;
