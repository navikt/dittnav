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
  const store = useStore();

  useEffect(
    () => {
      Api.fetchBeskjeder()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addBeskjeder(content);
        })
        .catch(() => {
          store.setErrorBeskjeder();
        });

      Api.fetchOppgaver()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addOppgaver(content);
        })
        .catch(() => {
          store.setErrorOppgaver();
        });

      Api.fetchInnbokser()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addInnbokser(content);
        })
        .catch(() => {
          store.setErrorInnbokser();
        });

      Api.fetchInaktiveBeskjeder()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addInaktiveBeskjeder(content);
        })
        .catch(() => {
          store.setErrorInaktiveBeskjeder();
        });

      Api.fetchInaktiveOppgaver()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addInaktiveOppgaver(content);
        })
        .catch(() => {
          store.setErrorInaktiveOppgaver();
        });

      Api.fetchInaktiveInnbokser()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addInaktiveInnbokser(content);
        })
        .catch(() => {
          store.setErrorInaktiveInnbokser();
        });

      Api.fetchInnloggingsstatus()
        .then(([content]) => {
          store.addInnloggingsstatus(content);
        })
        .catch(() => {
          store.setErrorInnloggingsstatus();
        });
    }, [],
  );

  useEffect(
    () => {
      Api.fetchOppfolging()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addOppfolging(content);
        }).catch(() => {
          store.setErrorOppfolging();
        });

      Api.fetchMeldekort()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addMeldekort(content);
        }).catch(() => {
          store.setErrorMeldekort();
        });

      Api.fetchPersonNavn()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addNavn(content);
        }).catch(() => {
          Api.fetchPersonIdent()
            .then(([content]) => {
              store.addIdent(content);
              store.setErrorNavn();
            })
            .catch(() => {
              store.setErrorIdent();
            });
        });

      Api.fetchSaker()
        .then(([content, headers]) => {
          const { feilendeBaksystem } = content;
          if (feilendeBaksystem.length > 0) {
            store.addPaabegynteSoknader(content);
            store.setErrorPaabegynteSoknader();
          } else {
            checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
            store.addPaabegynteSoknader(content);
          }
        }).catch(() => {
          store.setErrorPaabegynteSoknader();
        });

      Api.fetchMeldinger()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addMeldinger(content);
        }).catch(() => {
          store.setErrorMeldinger();
        });

      Api.fetchSakstema()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, store.toggleInnloggingsModal);
          store.addSakstema(content);
        }).catch(() => {
          store.setErrorSakstema();
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
