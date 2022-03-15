/**
 * storage.js
 *
 * Exports a function which serves a singleton Storage instance, with an
 * immutable id. The first time the GetStorage() function is called, a
 * string id must be provided. Subsequent times, the id string will be
 * ignored, so it can be omitted.
 * 
 * This singleton Storage instance reads from and writes to
 * localStorage, if it's available, or just pretends to do so if it's
 * not.
 *
 * CHANGE LOG
 * ----------
 * 20210718: Allow setItem to receive an object
 * 20210823: Export a function that expects an id, and returns a
 *           singleton instance, rather than singleton instance directly
 */


let singleton


/**
 * If window.localStorage is not available, an instance of the
 * CustomStorage class will be used instead. No data will be saved
 * to the user's hard drive, and no errors will occur.
 *
 * @class      CustomStorage ()
 */
class CustomStorage {
  constructor() {
    this.storage = {};
  }

  // Called by _save() in Storage instance
  setItem(key, value) {
    this.storage[key] = value;
  }
}


/**
 * @class      Storage()
 */
class Storage {
  constructor(id) {
    this.id = id;
    this.stored = false; // let's be pessimistic

    try {
      this.storage = window.localStorage;
      this.settings = JSON.parse(this.storage.getItem(this.id));
      // may be null
      this.stored = true; // we can be optimistic now
    } catch (error) {
      this.storage = new CustomStorage();
    }

    if (!this.settings || typeof this.settings !== "object") {
      this.settings = {};
    }
  }

  setItem(key, value) {
    if (typeof key === "object") {
      const keys = Object.keys(key)

      keys.forEach(property => {
        this.setItem(property, key[property])
      })

      return this.stored
    }

    this.settings[key] = value;
    this._save();
    
    return this.stored; // false for a simulation
  }

  set(settings) {
    Object.assign(this.settings, settings);
    this._save();
    return this.stored; // false for a simulation
  }

  getItem(key) {
    return this.settings[key];
  }

  get(key) {
    return Object.assign({}, this.settings);
  }

  restore(settings) {
    Object.assign(settings, this.settings);
  }

  _save() {
    const string = JSON.stringify(this.settings);
    this.storage.setItem(this.id, string);
  }
}


function GetStorage(id) {
  if (!singleton) {
    if (typeof id !== "string") {
      throw new Error("String id expected for GetStorage: *", id, "*")
    }

    singleton = new Storage(id)
  }

  return singleton
}


export default GetStorage;
