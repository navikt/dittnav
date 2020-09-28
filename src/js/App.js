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
  const { addInnloggingsstatus, addOppfolging, addMeldekort, addNavn, addIdent, addPaabegynteSoknader, addMeldinger } = useStore();
  const { addSakstema, toggleInnloggingsModal, setErrorBeskjeder, setErrorInaktiveBeskjeder, setErrorOppgaver } = useStore();
  const { setErrorInaktiveOppgaver, setErrorInaktiveInnbokser, setErrorInnloggingsstatus, setErrorOppfolging } = useStore();
  const { setErrorMeldekort, setErrorNavn, setErrorIdent, setErrorPaabegynteSoknader, setErrorMeldinger } = useStore();
  const { setErrorSakstema, setErrorInnbokser } = useStore();

  useEffect(
    () => {
      Api.fetchBeskjeder()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addBeskjeder(content);
        })
        .catch(() => {
          setErrorBeskjeder();
        });

      Api.fetchOppgaver()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addOppgaver(content);
        })
        .catch(() => {
          setErrorOppgaver();
        });

      Api.fetchInnbokser()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInnbokser(content);
        })
        .catch(() => {
          setErrorInnbokser();
        });

      Api.fetchInaktiveBeskjeder()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInaktiveBeskjeder(content);
        })
        .catch(() => {
          setErrorInaktiveBeskjeder();
        });

      Api.fetchInaktiveOppgaver()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInaktiveOppgaver(content);
        })
        .catch(() => {
          setErrorInaktiveOppgaver();
        });

      Api.fetchInaktiveInnbokser()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInaktiveInnbokser(content);
        })
        .catch(() => {
          setErrorInaktiveInnbokser();
        });

      Api.fetchInnloggingsstatus()
        .then(([content]) => {
          addInnloggingsstatus(content);
        })
        .catch(() => {
          setErrorInnloggingsstatus();
        });
    }, [],
  );

  useEffect(
    () => {
      Api.fetchOppfolging()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addOppfolging(content);
        }).catch(() => {
          setErrorOppfolging();
        });

      Api.fetchMeldekort()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addMeldekort(content);
        }).catch(() => {
          setErrorMeldekort();
        });

      Api.fetchPersonNavn()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addNavn(content);
        }).catch(() => {
          Api.fetchPersonIdent()
            .then(([content]) => {
              addIdent(content);
              setErrorNavn();
            })
            .catch(() => {
              setErrorIdent();
            });
        });

      Api.fetchSaker()
        .then(([content, headers]) => {
          const { feilendeBaksystem } = content;
          if (feilendeBaksystem.length > 0) {
            addPaabegynteSoknader(content);
            setErrorPaabegynteSoknader();
          } else {
            checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
            addPaabegynteSoknader(content);
          }
        }).catch(() => {
          setErrorPaabegynteSoknader();
        });

      Api.fetchMeldinger()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addMeldinger(content);
        }).catch(() => {
          setErrorMeldinger();
        });

      Api.fetchSakstema()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addSakstema(content);
        }).catch(() => {
          setErrorSakstema();
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
