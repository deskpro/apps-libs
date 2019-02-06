import PropertyBag from './PropertyBag';

/**
 * A simple property bag that exposes accessors for the most common properties of this application instance
 *
 * @class
 * @extends {PropertyBag}
 */
class InstanceProps extends PropertyBag {
  /**
   * @param {String} appId the id of this instance's application
   * @param {String} appTitle the title of this instance's application
   * @param {String} appPackageName the package name (from package.json) f
   * @param {String} instanceId
   * @param {String} locale
   * @param {...*} [otherProps] experimental or undocumented props
   */
  constructor({
    appId,
    appTitle,
    appPackageName,
    instanceId,
    locale,
    ...otherProps
  }) {
    super({
      appId,
      appTitle,
      appPackageName,
      instanceId,
      locale,
      ...otherProps,
    });
  }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get appId() {
    return this.props.appId;
  }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get appTitle() {
    return this.props.appTitle;
  }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get appPackageName() {
    return this.props.appPackageName;
  }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get instanceId() {
    return this.props.instanceId;
  }

  /**
   * @public
   * @readonly
   *
   * @type {String}
   */
  get locale() {
    return this.props.locale;
  }
}

export default InstanceProps;
