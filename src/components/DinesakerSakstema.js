import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { Format } from '../constants';
import { listOfActions, listOfComponentNames, logAmplitudeEvent } from '../utils/amplitudeUtils';

const DinesakerSakstema = (props) => {
  const { sistEndret, navn, detaljvisningUrl } = props.tema;
  return (
    <div className="sak-container">
      <Lenke
        href={detaljvisningUrl}
        className="sak-lenke"
        id="sak-lenke-id"
        onClick={() => logAmplitudeEvent(listOfComponentNames.DineSisteSakerFlis, listOfActions.TrykkPaaLenke)}
      >
        <div className="sak-temanavn lenke">
          <Undertittel>
            {navn}
          </Undertittel>
        </div>

        <div className="sak-status">
          <Undertekst>
            <FormattedMessage id="sakstema.sist.oppdatert" />
            {
              sistEndret && sistEndret !== ''
                ? (
                  <FormattedDate
                    value={moment(sistEndret, Format.SAKSTEMA)}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                ) : <FormattedMessage id="sakstema.dato.ukjent" />
            }
          </Undertekst>
        </div>
      </Lenke>
    </div>
  );
};

DinesakerSakstema.propTypes = {
  tema: PropTypes.shape({
    kode: PropTypes.string.isRequired,
    navn: PropTypes.string.isRequired,
    sistEndret: PropTypes.string.isRequired,
    detaljvisningUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default DinesakerSakstema;
