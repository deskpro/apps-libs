import React from 'react';
import PropTypes from 'prop-types';
import DeskproAppContext from './DeskproAppContext';
import I18nContext from './I18n/I18nContext';

class DeskproApp extends React.PureComponent {
  static propTypes = {
    dpapp: PropTypes.object.isRequired,
    phrasePacks: PropTypes.object
  }

  constructor(props) {
    super(props)
    if (props.phrasePacks) {
      props.dpapp.i18n.addPhrasePacks(props.phrasePacks);
    }
  }

  render() {
    return (
      <DeskproAppContext.Provider value={{ dpapp: this.props.dpapp }}>
        <I18nContext.Provider value={{ i18n: this.props.dpapp.i18n }}>
          {this.props.children}
        </I18nContext.Provider>
      </DeskproAppContext.Provider>
    );
  }
}

export default DeskproApp;
