import { BaseError, LOG_LEVEL } from "./base";

/**
 * Failure一般为服务器可预知，需要处理，不处理会中断运行，但是服务器在生产环境下不返回具体情况的错误（但是会log）。
 */
export class Failure extends BaseError {
  /** 一般Failure的code为0以下 */
  code = -1
  name = 'Failure';
  logLevel = LOG_LEVEL.ERROR
}

export class NotImplementFailure extends Failure {
  name = 'NotImplementFailure';
}

export class WrongArgumentFailure extends Failure {
  name = 'WrongArgumentFailure';
}
