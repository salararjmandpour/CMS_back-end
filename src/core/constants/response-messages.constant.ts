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
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  FAILED_SET_CONFIG_SMS = 'FAILED_SET_CONFIG_SMS',
  FAILED_SET_CONFIG_EMAIL = 'FAILED_SET_CONFIG_EMAIL',
  FAILED_SET_PUBLIC_CONFIG = 'FAILED_SET_PUBLIC_CONFIG',
  FAILED_CREATE_SMS_CONFIG = 'FAILED_CREATE_SMS_CONFIG',
  FAILED_CREATE_EMAIL_CONFIG = 'FAILED_CREATE_EMAIL_CONFIG',
  FAILED_CREATE_PUBLIC_CONFIG = 'FAILED_CREATE_PUBLIC_CONFIG',
  NOT_FOUND_SMS_CONFIG = 'NOT_FOUND_SMS_CONFIG',
  NOT_FOUND_EMAIL_CONFIG = 'NOT_FOUND_EMAIL_CONFIG',
  NOT_FOUND_PUBLIC_CONFIG = 'NOT_FOUND_PUBLIC_CONFIG',
  CODE_IS_REQUIRED = 'CODE_IS_REQUIRED',
  CONFIGURED_SUCCESSFULLY = 'CONFIGURED_SUCCESSFULLY',
  INVALID_TIMEZONE = 'INVALID_TIMEZONE',
  INVALID_OBJECT_ID = 'INVALID_OBJECT_ID',
  FAILED_CREATE_PRODUCT = 'FAILED_CREATE_PRODUCT',
  FAILED_UPDATE_PRODUCT = 'FAILED_UPDATE_PRODUCT',
  PRODUCT_ID_ALREADY_EXIST = 'PRODUCT_ID_ALREADY_EXIST',
  SLUG_ALREADY_EXIST = 'SLUG_ALREADY_EXIST',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  FAILED_GET_PRODUCT_LIST = 'FAILED_GET_PRODUCT_LIST',
  IMAGES_IS_REQUIRED = 'IMAGES_IS_REQUIRED',
  UPLOADED_IMAGES = 'UPLOADED_IMAGES',
  TITLE_ALREADY_EXIST = 'TITLE_ALREADY_EXIST',
  NAME_ALREADY_EXIST = 'NAME_ALREADY_EXIST',
  FAILED_CREATE_CATEGORY = 'FAILED_CREATE_CATEGORY',
  FAILED_UPDATE_CATEGORY = 'FAILED_UPDATE_CATEGORY',
  FAILED_GET_CATEGORY_LIST = 'FAILED_GET_CATEGORY_LIST',
  FAILED_DELETE_CATEGORY = 'FAILED_DELETE_CATEGORY',
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  CATEGORY_DELETED = 'CATEGORY_DELETED',
}
