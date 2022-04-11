import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import injectSheet from 'react-jss';
import { Icon } from '@meetfranz/ui';
import { mdiDotsVertical } from '@mdi/js';
import { windowsTitleBarHeight } from '../../theme/default/legacy';
import { AppMenu } from '../../lib/Menu';
import AppStore from '../../stores/AppStore';

const styles = theme => ({
  root: {
    background: theme.colorBackground,
    height: parseInt(windowsTitleBarHeight, 10),
    display: 'flex',
    paddingLeft: 10,
    alignItems: 'center',
  },
  icon: {
    width: 18,
    marginRight: 8,
  },
  brand: {
    fontWeight: 'bold',
    letterSpacing: '-0.2px',
    marginRight: 10,
  },
  menuButton: {
    display: 'flex',
    borderRadius: theme.borderRadius,

    '&:hover': {
      background: theme.styleTypes.secondary.accent,
      color: theme.styleTypes.secondary.contrast,
      transition: '0.25s all',

      '& svg': {
        fill: theme.styleTypes.secondary.contrast,
      },
    },
  },
});

@inject('stores') @injectSheet(styles) @observer
class AppMenuBar extends Component {
  static contextTypes = {
    intl: intlShape,
  };

  state = {
    showWindow: false,
  }

  appMenu = null;

  buttonRef = React.createRef();

  buildMenu(intl) {
    const {
      app,
    } = this.props.stores;

    this.appMenu = new AppMenu({
      intl,
      data: app.menuData,
    });
  }

  toggleMenu(intl) {
    if (this.state.showWindow) {
      this.buildMenu(intl);

      const buttonPos = this.buttonRef.current.getBoundingClientRect();

      console.log('button pos', buttonPos);

      this.appMenu.menu.popup({
        x: parseInt(buttonPos.x, 10),
        y: parseInt(buttonPos.y + buttonPos.height + 10, 10),
      });
    }

    this.setState(prevState => ({ showWindow: !prevState.showWindow }));
  }

  render() {
    const {
      // eslint-disable-next-line react/prop-types
      classes,
    } = this.props;

    const { intl } = this.context;

    return (
      <div
        className={classes.root}
      >
        <img src="./assets/images/logo.svg" alt="" className={classes.icon} />
        <span className={classes.brand}>Franz</span>
        <button type="button" className={classes.menuButton} onClick={() => this.toggleMenu(intl)} ref={this.buttonRef}>
          <Icon icon={mdiDotsVertical} />
        </button>
      </div>
    );
  }
}

AppMenuBar.wrappedComponent.propTypes = {
  stores: PropTypes.shape({
    app: PropTypes.instanceOf(AppStore).isRequired,
  }).isRequired,
};

export default AppMenuBar;
