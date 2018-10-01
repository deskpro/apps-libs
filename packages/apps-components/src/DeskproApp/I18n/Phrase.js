import React from 'react';
import PropTypes from 'prop-types';
import I18nContext from './I18nContext';

const Phrase = ({ id, ...vars }) => (
  <I18nContext.Consumer>
    { ({ i18n }) => i18n.t(id, vars) }
  </I18nContext.Consumer>
);

Phrase.propTypes = {
  id: PropTypes.string.isRequired
};

export default Phrase;
