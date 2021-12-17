import { Failure } from './failure';
import { RevealableError } from './revealable';
import { ServerInternalError } from './errors';

export type TCatchErrorConfig<TReturn = unknown> = {
  /** log所有异常 */
  catchAll?: (e: unknown) => Promise<TReturn | void | boolean> | TReturn | void | boolean;
  /** log所有未返回原因的异常 */
  logUncaught?: (e: unknown) => Promise<void> | void;
  /** log所有服务器已知错误 */
  logFailure?: (e: Failure) => Promise<void> | void;
  /** log所有服务器返回原因的错误 */
  logReasonable?: (e: RevealableError) => Promise<void> | void;
  /** log所有服务器未返回原因的错误 */
  logUnreasonable?: (e: unknown) => Promise<void> | void;
  throwServerError?: boolean;
};

export const catchError = async <TReturn = unknown>(
  inner: CallableFunction,
  {
    catchAll,
    logUncaught,
    logFailure,
    logReasonable,
    logUnreasonable,
    throwServerError,
  }: TCatchErrorConfig<TReturn> = {},
) => {
  try {
    return await inner();
  } catch (e) {
    const cr = await catchAll?.(e);
    if (cr !== undefined && cr !== false) {
      // 被钩子拦截
      return cr;
    }
    if (e instanceof RevealableError) {
      await logReasonable?.(e);
      return e.toJSON();
    }
    await logUncaught?.(e);
    if (e instanceof Failure) {
      // 服务器已知错误（可预料）
      await logFailure?.(e);
    }
    if (throwServerError) {
      // 服务器未知错误
      throw e;
    } else {
      const err = new ServerInternalError();
      await logUnreasonable?.(e);
      return err.toJSON();
    }
  }
};
