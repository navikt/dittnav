import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import ScrollToTop from './components/scroll/ScrollToTop';
import Config from './globalConfig';
import '../less/index.less';
import Api from './Api';
import useStore from './hooks/useStore';
import Home from './pages/Home/Home';
import Varslinger from './pages/Varslinger/Varslinger';
import checkIfModalShouldBeToggled from './utils/modal';

const App = () => {
  const { addBeskjeder, addInaktiveBeskjeder, addOppgaver, addInnbokser, addInaktiveOppgaver, addInaktiveInnbokser } = useStore();
  const { addInnloggingsstatus, addOppfolging, addMeldekort, addNavn, addIdent, addPaabegynteSoknader } = useStore();
  const { addMeldinger, addSakstema, toggleInnloggingsModal, setOppfolgingFailed, setError } = useStore();

  useEffect(
    () => {
      Api.fetchBeskjeder()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addBeskjeder(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchOppgaver()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addOppgaver(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInnbokser()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInnbokser(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveBeskjeder()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInaktiveBeskjeder(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveOppgaver()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInaktiveOppgaver(result);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveInnbokser()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
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
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addOppfolging(result);
        }).catch(() => {
          setOppfolgingFailed();
          setError();
        });

      Api.fetchMeldekort()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addMeldekort(result);
        }).catch(() => {
          setError();
        });

      Api.fetchPersonNavn()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
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
            checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
            addPaabegynteSoknader(result);
          }
        }).catch(() => {
          setError();
        });

      Api.fetchMeldinger()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addMeldinger(result);
        }).catch(() => {
          setError();
        });

      Api.fetchSakstema()
        .then(([result, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
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
