import React, { Component } from 'react';
import LoginLink from 'js/components/LoginLink';
import conf from 'js/Config';

const link = 'lenke';
const button = 'knapp-hoved knapp-liten';
const model = [
  { id: 'brukernavnpassord', url: conf.ARBEID_LOGIN_LINK_URL, linkClassName: button },
  { id: 'endagspassord-pensjon', url: conf.PSELV_LOGIN_LINK_URL, linkClassName: button },
  { id: 'endagspassord-ufore', url: conf.PSELV_LOGIN_LINK_UT_URL, linkClassName: button },
  { id: 'arbeidsgiver', url: conf.dittNav.ARBEIDSGIVER_LOGIN_URL, linkClassName: button },
  { id: 'om', url: `${conf.dittNav.CONTEXT_PATH}/innlogget`, linkClassName: link },
];

class Login extends Component {
  render() {
    return (
      <div className="row">
        <h1 className="typo-sidetittel">Alternativ pålogging</h1>
        <div className="col-md-12 col-sm-12">
          <div className="primary col-md-8 col-md-offset-2 sentrert alternativ-paalogging">
            {model.map(e => (
              <React.Fragment key={e.id}>
                <LoginLink
                  id={e.id}
                  title={`paalogging.alternativ.${e.id}.tittel`}
                  description={`paalogging.alternativ.${e.id}.beskrivelse`}
                  url={e.url}
                  linkText={`paalogging.alternativ.${e.id}.lenketekst`}
                  linkClassName={e.linkClassName}
                />
                <hr />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
