import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Input, Select } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import useForm from '../../../hooks/useForm';
import Api from '../../../Api';

const initialState = {
  statusGlobal: 'SENDT',
  statusIntern: '',
  grupperingsid: '010100',
  link: '',
  sakstema: '',
};

const StatusoppdateringForm = () => {
  const [values, handleChange, handleSubmit] = useForm(initialState, Api.postStatusoppdatering);

  return (
    <>
      <Select name="statusGlobal" label="Velg global status:" onChange={handleChange}>
        <option value="SENDT">Sendt</option>
        <option value="UNDER_BEHANDLING">Under behandling</option>
        <option value="MOTTATT">Mottatt</option>
        <option value="FERDIG">Ferdig</option>
      </Select>
      <form onSubmit={handleSubmit}>
        <Input
          label="Skriv inn intern status:"
          name="statusIntern"
          value={values.statusIntern}
          onChange={e => handleChange(e)}
        />
        <Input
          label="Skriv inn lenke:"
          name="link"
          value={values.link}
          onChange={e => handleChange(e)}
        />
        <Input
          label="Skriv inn sakstema:"
          name="sakstema"
          value={values.sakstema}
          onChange={e => handleChange(e)}
        />
        <Input
          label="Skriv inn grupperingsid:"
          name="grupperingsid"
          value={values.grupperingsid}
          onChange={e => handleChange(e)}
          placeholder="010100"
        />
        <div className="knapper">
          <Knapp className="knapper__send" htmlType="submit">
            <F id="statusoppdatering.send" />
          </Knapp>
        </div>
      </form>
    </>
  );
};

export default StatusoppdateringForm;
