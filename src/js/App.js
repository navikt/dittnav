import React, { Component } from "react";
import PropTypes from "prop-types";

import conf from "./Config";
import FeilMeldinger from "./components/FeilMeldinger";
import Postkasse from "./pages/Postkasse";
import Login from "./pages/Login";
import Home from "./pages/Home";

function route(props, options) {
  const { path } = props;
  const { info, paabegynteSoknader, mininnboks } = options;
  switch (path) {
    case `${conf.dittNav.CONTEXT_PATH}/postkasse`:
      return <Postkasse {...props} info={info} />;
    case `${conf.dittNav.CONTEXT_PATH}/login`:
      return <Login />;
    default:
      return (
        <Home
          info={info}
          paabegynteSoknader={paabegynteSoknader}
          mininnboks={mininnboks}
        />
      );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    const r = props.data;
    const { paabegynteSoknader } = r;
    const errors = [];
    if (
      paabegynteSoknader &&
      paabegynteSoknader.feilendeBaksystem &&
      paabegynteSoknader.feilendeBaksystem.length > 0
    ) {
      errors.push("error.paabegynte");
    }
    this.state = {
      info: r,
      mininnboks: r.ubehandledeMeldinger ? r.ubehandledeMeldinger : [],
      paabegynteSoknader,
      errors,
    };
  }

  render() {
    const { info, paabegynteSoknader, mininnboks, errors } = this.state;
    return (
      <main role="main">
        <FeilMeldinger errors={errors} />
        <div className="container maincontent side-innhold">
          {route(this.props, { info, paabegynteSoknader, mininnboks })}
        </div>
      </main>
    );
  }
}

App.propTypes = {
  path: PropTypes.string.isRequired
};

export default App;
