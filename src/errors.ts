import { RevealableError } from './revealable';

/**
 * 0：无错误
 * 1：未分类错误
 * 2：请求错误
 * 3：外部系统错误
 * 4：找不到资源
 * 5：权限错误
 * 6：服务器错误（内部未知错误）
 *
 * 后方为0则为用户自定义错误
 * 后方为9则向下进位
 */

export class RequestError extends RevealableError {
  code = 2;
  name = 'RequestError';
  message = 'Wrong Request';
}

export class ArgumentError extends RequestError {
  code = 21;
  name = 'ArgumentError';
  message = 'Argument Error';
}

export class NotFoundError extends RevealableError {
  code = 4;
  name = 'NotFoundError';
  message = 'Not Found Error';
}

export class AuthError extends RevealableError {
  code = 5;
  name = 'AuthError';
  message = 'Auth Error';
}

export class NeedLoginError extends AuthError {
  code = 51;
  name = 'NeedLoginError';
  message = 'Need Login Token';
}

export class UserBannedError extends AuthError {
  code = 52;
  name = 'UserBannedError';
  message = 'User is been Banned!';
}

export class RoleNotAllowedError extends AuthError {
  code = 53;
  name = 'RoleNotAllowedError';
  message = 'Need Login Token';
}

export class NotAllowedObjectError extends AuthError {
  code = 54;
  name = 'RoleNotAllowedError';
  message = 'Need Login Token';
}

export class ServerError extends RevealableError {
  code = 6;
  name = 'ServerError';
  message = 'Server Error';
}

export class ServerInternalError extends RevealableError {
  code = 61;
  name = 'ServerError';
  message = 'Server Internal Error';
}

export class ServerNetworkError extends ServerInternalError {
  code = 62;
  name = 'ServerNetworkError';
  message = 'Network Connected Failed';
}

export class ServerMaintainError extends ServerInternalError {
  code = 63;
  name = 'ServerMaintainError';
  message = 'Server is Maintaining';
}

export class ServerBusyError extends ServerInternalError {
  code = 64;
  name = 'ServerBusyError';
  message = 'Server is Busy';
}
