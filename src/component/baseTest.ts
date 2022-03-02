import { consoleError, consoleInfo } from "../base";

/**
 * @class
 * @this {BaseTest}
 */
export class BaseTest {
  /**
   * @private
   * @type {string}
   */
  private name: string;
  /**
   * @param {string=} opt_name
   */
  constructor(opt_name?: string | undefined) {
    this.name = opt_name;
  }
  /**
   * @return {void}
   */
  init(): void {
  }
  /**
   * @param {string} message
   * @param {!Object|string|number|boolean} object
   * @return {undefined}
   */
  showError(message, object) {
    consoleError(this.name + '.' + message, object);
  }
  /**
   * @param {string} message
   * @param {!Object} object
   * @return {undefined}
   */
  showLog(message, object) {
    consoleInfo(this.name + '.' + message, object);
  }
}
