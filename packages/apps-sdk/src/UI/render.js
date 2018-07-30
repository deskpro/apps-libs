/**
 * @param {AppClient} dpapp
 * @param {function} createRenderer
 * @return {function(): {badgeVisibility: *, badgeCount: *, display: *, title: *, iconUrl: string, message: *, messageType: *, refresh: *, collapse: *, expand: *, closeMessage: *}}
 */
export default function connectRenderer(dpapp, createRenderer)
{
  const renderer = createRenderer(dpapp);

  // DPAPP_MANIFEST is exported by webpack.
  const manifest = DPAPP_MANIFEST || dpapp.manifest;

  return function render()
  {
    renderer ({
      badgeVisibility: dpapp.ui.badgeVisibility ,
      badgeCount:      dpapp.ui.badgeCount ,
      display:         dpapp.ui.display ,
      title:           manifest ? manifest.title : "" ,
      iconUrl:         "../assets/icon.png" ,

      message:        dpapp.ui.message ,
      messageType:    dpapp.ui.messageType ,

      refresh:          dpapp.refresh ,
      collapse:         dpapp.ui.collapse ,
      expand:           dpapp.ui.expand ,
      closeNotification:dpapp.ui.closeNotification,

      state:            dpapp.ui.state
    });
  };
}
