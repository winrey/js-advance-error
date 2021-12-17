export const CODE_OK = 0;

export const LOG_LEVEL = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  VERBOSE: 3,
  DEBUG: 4,
  SILLY: 5,
};

export interface I2StringOptions {
  msg?: string;
  logData?: boolean;
}

export interface I2JsonOptions {
  payload?: object;
  withStack?: boolean;
  withData?: boolean;
}

export abstract class BaseError extends Error {
  code?: number;
  name = 'BaseError';
  message = '';
  data?: unknown;
  logLevel = LOG_LEVEL.ERROR;

  constructor(message?: string) {
    super(message);
    /* 以下为target: es5需要的特殊处理 目前仅供观赏
    this.name = new.target.name;
    if (typeof (Error as any).captureStackTrace === 'function') {
      (Error as any).captureStackTrace(this, new.target);
    }
    if (typeof Object.setPrototypeOf === 'function') {
      Object.setPrototypeOf(this, new.target.prototype);
    } else {
      (this as any).__proto__ = new.target.prototype;
    }
    */
    this.message = message || this.message;
    Error?.captureStackTrace?.(this, this.constructor);
  }

  /**
   * Used to show msg to the user
   * @returns
   */
  getMsg() {
    return this.message;
  }

  getData() {
    return this.data;
  }

  getTag() {
    return [this.code || '', this.name].join(':');
  }

  /**
   * Used to log
   * @returns
   */
  toString({ msg = '', logData = false }: I2StringOptions = {}) {
    const tag = this.getTag();
    return [tag ? `[${tag}]` : '', msg || this.getMsg(), logData ? 'data: ' + JSON.stringify(this.getData() || '') : '']
      .filter((v) => v !== undefined && JSON.stringify(v.trim()) !== '')
      .join(' ');
  }

  /**
   * Used to return api error / log
   * @returns
   */
  toJSON({ payload = {}, withStack = false, withData = true }: I2JsonOptions = {}) {
    const stack = withStack && this.stack ? { stack: this.stack } : {};
    const data = this.getData();
    return {
      errCode: this.code,
      errType: this.name,
      errMsg: this.getMsg() || this.message,
      ...payload,
      ...(withData && data ? { data } : {}),
      ...stack,
    };
  }
}
