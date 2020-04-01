import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron';
import Config from '../globalConfig';

const InngangVarslinger = () => (
  <div className="varslinger-inngang-wrapper">
    <Undertittel className="varslinger-inngang">
      <Lenke href={Config.dittNav.DITTNAV_VARSLINGER} tabIndex="0" id="varslinger-inngang__lenke-id">
        <FormattedMessage id="dittnav.infomeldinger.inngang.varslinger" />
        <HoyreChevron className="varslinger-inngang__chevron" />
      </Lenke>
    </Undertittel>
  </div>
);

export default InngangVarslinger;
