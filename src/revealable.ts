import { BaseError, LOG_LEVEL } from "./base";

/**
 * Failure一般为服务器可预知，可以不处理，不处理会停止请求并返回具体的请求错误原因，会视情况log。
 */
export class RevealableError extends BaseError {
  code = 1
  name = "RevealableError"
  logLevel = LOG_LEVEL.VERBOSE
}
