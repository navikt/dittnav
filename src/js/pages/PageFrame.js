import React from 'react';
import { arrayOf, oneOfType, node, object, string } from 'prop-types';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import FeilMeldinger from '../components/FeilMeldinger';

const PageFrame = (props) => {
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

PageFrame.propTypes = {
  breadcrumbs: arrayOf(object).isRequired,
  uniqueErrors: arrayOf(oneOfType([string])).isRequired,
  children: node.isRequired,
};

export default PageFrame;
