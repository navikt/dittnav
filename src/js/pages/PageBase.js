import React from 'react';
import { arrayOf, oneOfType, node, object, string } from 'prop-types';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import FeilMeldinger from '../components/FeilMeldinger';

const PageBase = (props) => {
  setBreadcrumbs(props.breadcrumbs);

  return (
    <main role="main">
      <FeilMeldinger errors={props.uniqueErrors} />
      <div className="container">
        {props.children}
      </div>
    </main>
  );
};

PageBase.propTypes = {
  breadcrumbs: arrayOf(object).isRequired,
  uniqueErrors: arrayOf(oneOfType([string])).isRequired,
  children: node.isRequired,
};

export default PageBase;
