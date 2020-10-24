import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useBeskjeder, useInnbokser, useOppgaver } from './hooks/useBrukernotifikasjoner';
import { useInaktiveBeskjeder, useInaktiveInnbokser, useInaktiveOppgaver } from './hooks/useInaktiveBrukernotifikasjoner';
import { useIdent, useMeldekort, useMeldinger, useNavn, useOppfolging } from './hooks/usePerson';
import { useSaker, useSakstema } from './hooks/useSaker';
import { Toggle } from './constants';
import useInnloggingsstatus from './hooks/useInnloggingsstatus';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import ScrollToTop from './components/scroll/ScrollToTop';
import useStore from './hooks/useStore';
import Home from './pages/Home/Home';
import Varslinger from './pages/Varslinger/Varslinger';
import checkIfModalShouldBeToggled from './utils/modal';
import Tidslinje from './pages/Tidslinje/Tidslinje';
import Statusoppdatering from './pages/Statusoppdatering/Statusoppdatering';
import Api from './Api';

const App = () => {
  const [beskjeder] = useBeskjeder();
  const [oppgaver] = useOppgaver();
  const [innbokser] = useInnbokser();
  const [inaktiveBeskjeder] = useInaktiveBeskjeder();
  const [inaktiveOppgaver] = useInaktiveOppgaver();
  const [inaktiveInnbokser] = useInaktiveInnbokser();
  const [innloggingsstatus] = useInnloggingsstatus();
  const [oppfolging] = useOppfolging();
  const [meldekort] = useMeldekort();
  const [meldinger] = useMeldinger();
  const [sakstema] = useSakstema();
  const [navn] = useNavn();
  const [ident] = useIdent();
  const [saker] = useSaker();

  const store = useStore();

  // TODO: fix array usage.
  useEffect(() => {
    if (beskjeder.data) {
      checkIfModalShouldBeToggled(beskjeder.data[1], store.toggleInnloggingsModal);
      store.addBeskjeder(beskjeder.data[0]);
    }
  }, [beskjeder.status]); // TODO: consider react-hooks lint warning

  useEffect(() => {
    if (oppgaver.data) {
      checkIfModalShouldBeToggled(oppgaver.data[1], store.toggleInnloggingsModal);
      store.addOppgaver(oppgaver.data[0]);
    }
  }, [oppgaver.status]);

  useEffect(() => {
    if (innbokser.data) {
      checkIfModalShouldBeToggled(innbokser.data[1], store.toggleInnloggingsModal);
      store.addInnbokser(innbokser.data[0]);
    }
  }, [innbokser.status]);

  useEffect(() => {
    if (inaktiveBeskjeder.data) {
      checkIfModalShouldBeToggled(inaktiveBeskjeder.data[1], store.toggleInnloggingsModal);
      store.addInaktiveBeskjeder(inaktiveBeskjeder.data[0]);
    }
  }, [inaktiveBeskjeder.status]);

  useEffect(() => {
    if (inaktiveOppgaver.data) {
      checkIfModalShouldBeToggled(inaktiveOppgaver.data[1], store.toggleInnloggingsModal);
      store.addInaktiveOppgaver(inaktiveOppgaver.data[0]);
    }
  }, [inaktiveOppgaver.status]);

  useEffect(() => {
    if (inaktiveInnbokser.data) {
      checkIfModalShouldBeToggled(inaktiveInnbokser.data[1], store.toggleInnloggingsModal);
      store.addInaktiveInnbokser(inaktiveInnbokser.data[0]);
    }
  }, [inaktiveInnbokser.status]);

  useEffect(() => {
    if (innloggingsstatus.data) {
      store.addInnloggingsstatus(innloggingsstatus.data[0]);
    }
  }, [innloggingsstatus.status]);

  useEffect(() => {
    if (oppfolging.data) {
      checkIfModalShouldBeToggled(oppfolging.data[1], store.toggleInnloggingsModal);
      store.addOppfolging(oppfolging.data[0]);
    }
  }, [oppfolging.status]);

  useEffect(() => {
    if (meldekort.data) {
      checkIfModalShouldBeToggled(meldekort.data[1], store.toggleInnloggingsModal);
      store.addMeldekort(meldekort.data[0]);
    }
  }, [meldekort.status]);

  useEffect(() => {
    if (meldinger.data) {
      checkIfModalShouldBeToggled(meldinger.data[1], store.toggleInnloggingsModal);
      store.addMeldinger(meldinger.data[0]);
    }
  }, [meldinger.status]);

  useEffect(() => {
    if (sakstema.data) {
      checkIfModalShouldBeToggled(sakstema.data[1], store.toggleInnloggingsModal);
      store.addSakstema(sakstema.data[0]);
    }
  }, [sakstema.status]);

  useEffect(() => {
    if (navn.status === 'success') {
      checkIfModalShouldBeToggled(navn.data[1], store.toggleInnloggingsModal);
      store.addNavn(navn.data[0]);
    }
  }, [navn.status]);

  useEffect(() => {
    if (navn.status === 'error') {
      store.addIdent(ident.data[0]);
    }
  }, [navn.status]);

  useEffect(() => {
    if (saker.data) {
      checkIfModalShouldBeToggled(saker.data[1], store.toggleInnloggingsModal);
      store.addPaabegynteSoknader(saker.data[0]);
    } else if (saker.data && saker.data[0].feilendeBaksystem > 0) {
      store.addPaabegynteSoknader(saker.data[0]);
      store.setErrorPaabegynteSoknader();
    }
  }, [saker.status]);

  // TODO: check this
  useEffect(
    () => {
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
        {Toggle.TEST_SIDE && (
          <Route
            path="/dittnav/hendelser"
            exact
            component={HendelserTestSide}
          />
        )}
        {Toggle.TEST_SIDE && (
          <Route
            path="/dittnav/statusoppdatering"
            exact
            component={Statusoppdatering}
          />
        )}
        {Toggle.TEST_SIDE && (
          <Route
            path="/dittnav/tidslinje"
            exact
            component={Tidslinje}
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
