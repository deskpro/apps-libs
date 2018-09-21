import { UIEvents } from './index';

/**
 *
 * @param {AppClient} dpapp
 * @param {function} createRenderer
 * @return {function}
 */
export default function connectRenderer(dpapp, createRenderer) {
  const renderer = createRenderer(dpapp);

  const actions = {
    refresh: dpapp.refresh,
    collapse: dpapp.ui.collapse,
    expand: dpapp.ui.expand,
    closeNotification: dpapp.ui.closeNotification,
  };

  /**
   * @param {object}  props
   */
  function connectedRenderer(props) {
    try {
      const {
        badgeVisibility,
        badgeCount,
        display,
        notification,
        notificationType,
        state,
        title,
      } = props;

      renderer({
        badgeVisibility,
        badgeCount,
        display,
        notification,
        notificationType,
        state,

        title: title || dpapp.appTitle,
        iconUrl: 'assets/icon.png',

        ...actions,
      });
    } catch (e) {
      console.error('failed to invoke the renderer function', e);
    }
  }

  dpapp.on(UIEvents.EVENT_UI_CHANGED, connectedRenderer);
  return connectedRenderer;
}
