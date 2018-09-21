class NamespacedBrowserStorage {
  static createLocalStorage   = (ns) => new NamespacedBrowserStorage(ns, window.localStorage)
  static createSessionStorage = (ns) => new NamespacedBrowserStorage(ns, window.sessionStorage)

  constructor(ns, storage) {
    this.ns = ns;
    this.storage = storage;
  }

  getItem(key) {
    return this.storage.getItem(this.namespaceKey(key));
  }

  setItem(key, value) {
    return this.storage.setItem(this.namespaceKey(key), value);
  }

  removeItem(key) {
    return this.storage.removeKey(this.namespaceKey(key));
  }

  key() {
    throw new Error("Unsupported")
  }

  clear() {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (this.isThisNamespaceKey(key)) {
        this.removeItem(key);
      }
    }
  }

  get length() {
    return this.storage.length;
  }

  namespaceKey(key) {
    return this.ns + ':' + key;
  }

  isThisNamespaceKey(key) {
    return key.substring(0, this.ns.length+1) === this.ns + ':';
  }
}

export default NamespacedBrowserStorage;
