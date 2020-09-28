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
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addBeskjeder(content);
        })
        .catch(() => {
          setError();
        });

      Api.fetchOppgaver()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addOppgaver(content);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInnbokser()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInnbokser(content);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveBeskjeder()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInaktiveBeskjeder(content);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveOppgaver()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInaktiveOppgaver(content);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInaktiveInnbokser()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addInaktiveInnbokser(content);
        })
        .catch(() => {
          setError();
        });

      Api.fetchInnloggingsstatus()
        .then(([content]) => {
          addInnloggingsstatus(content);
        })
        .catch(() => {
          setError();
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
          setOppfolgingFailed();
          setError();
        });

      Api.fetchMeldekort()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addMeldekort(content);
        }).catch(() => {
          setError();
        });

      Api.fetchPersonNavn()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addNavn(content);
        }).catch(() => {
          Api.fetchPersonIdent()
            .then(([content]) => {
              addIdent(content);
              setError();
            })
            .catch(() => {
              setError();
            });
        });

      Api.fetchSaker()
        .then(([content, headers]) => {
          const { feilendeBaksystem } = content;
          if (feilendeBaksystem.length > 0) {
            addPaabegynteSoknader(content);
            setError();
          } else {
            checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
            addPaabegynteSoknader(content);
          }
        }).catch(() => {
          setError();
        });

      Api.fetchMeldinger()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addMeldinger(content);
        }).catch(() => {
          setError();
        });

      Api.fetchSakstema()
        .then(([content, headers]) => {
          checkIfModalShouldBeToggled(headers, toggleInnloggingsModal);
          addSakstema(content);
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
