export enum ResponseMessages {
  OK = 'OK',
  CREATED = 'CREATED',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  INVALID_ID = 'INVALID_ID',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  CODE_SENT_IS_NOT_CORRECT = 'CODE_SENT_IS_NOT_CORRECT',
  YOUR_CODE_EXPIRED = 'YOUR_CODE_EXPIRED',
  FAILED_SAVE_TOKEN_IN_DB = 'FAILED_SAVE_TOKEN_IN_DB',
  FAILED_SEND_OTP_SMS = 'FAILED_SEND_OTP_SMS',
  CODE_SENT_FOR_YOUR_EMAIL = 'CODE_SENT_FOR_YOUR_EMAIL',
  CODE_SENT_FOR_YOUR_MOBILE = 'CODE_SENT_FOR_YOUR_MOBILE',
  FAILED_SEND_OTP_EMAIL = 'FAILED_SEND_OTP_EMAIL',
  INVALID_EMAIL_OR_USERNAME = 'INVALID_EMAIL_OR_USERNAME',
  FAILED_UPLOAD_AVATAR = 'FAILED_UPLOAD_AVATAR',
  FILE_SIZE_TOO_LARGE = ' FILE_SIZE_TOO_LARGE',
  INVALID_FILE_FORMAT = 'INVALID_FILE_FORMAT',
  UPLOADED_AVATAR = 'UPLOADED_AVATAR',
  FILE_IS_REQUIRED = 'FILE_IS_REQUIRED',
  FAILED_GOOGLE_LOGIN = 'FAILED_GOOGLE_LOGIN',
}
