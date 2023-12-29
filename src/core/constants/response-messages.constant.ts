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
  AVATAR_UPLOADED_SUCCESS = 'AVATAR_UPLOADED_SUCCESS',
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
  CATEGORY_SLUG_ALREADY_EXIST = 'CATEGORY_SLUG_ALREADY_EXIST',
  PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
  FAILED_GET_PRODUCT_LIST = 'FAILED_GET_PRODUCT_LIST',
  IMAGES_IS_REQUIRED = 'IMAGES_IS_REQUIRED',
  UPLOADED_IMAGES = 'UPLOADED_IMAGES',
  TITLE_ALREADY_EXIST = 'TITLE_ALREADY_EXIST',
  CATEGORY_TITLE_ALREADY_EXIST = 'CATEGORY_TITLE_ALREADY_EXIST',
  FAILED_CREATE_CATEGORY = 'FAILED_CREATE_CATEGORY',
  FAILED_UPDATE_CATEGORY = 'FAILED_UPDATE_CATEGORY',
  FAILED_GET_CATEGORY_LIST = 'FAILED_GET_CATEGORY_LIST',
  FAILED_DELETE_CATEGORIES = 'FAILED_DELETE_CATEGORIES',
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  CATEGORIES_DELETED = 'CATEGORIES_DELETED',
  INVALID_MOBILE_FORMAT = 'INVALID_MOBILE_FORMAT',
  INVALID_TELEPHONE_FORMAT = 'INVALID_TELEPHONE_FORMAT',
  INVALID_POSTAL_CODE = 'INVALID_POSTAL_CODE',
  FAILED_UPDATE_ADDRESS = 'FAILED_UPDATE_ADDRESS',
  FAILED_GET_ADDRESS_LIST = 'FAILED_GET_ADDRESS_LIST',
  FAILED_DELETE_ADDRESS = 'FAILED_DELETE_ADDRESS',
  ADDRESS_NOT_FOUND = 'ADDRESS_NOT_FOUND',
  ADDRESS_DELETED = 'ADDRESS_DELETED',
  PRODUCT_ALREADY_EXIST_IN_WISHLIST = 'PRODUCT_ALREADY_EXIST_IN_WISHLIST',
  NOT_FOUND_PRODUCT_IN_WISHLIST = 'NOT_FOUND_PRODUCT_IN_WISHLIST',
  FAILED_ADD_TO_WISHLIST = 'FAILED_ADD_TO_WISHLIST',
  PRODUCT_ADDED_TO_WISHLIST = 'PRODUCT_ADDED_TO_WISHLIST',
  REMOVED_PRODUCT_FROM_WISHLIST = 'REMOVED_PRODUCT_FROM_WISHLIST',
  FAILED_GET_WISHLIST = 'FAILED_GET_WISHLIST',
  FAILED_ADD_TO_GALLERY = 'FAILED_ADD_TO_GALLERY',
  FILE_ADDED_TO_GALLERY = 'FILE_ADDED_TO_GALLERY',
  NOT_FOUND_FILE_IN_GALLERY = 'NOT_FOUND_FILE_IN_GALLERY',
  FAILED_UPDATE_FILE_IN_GALLERY = 'FAILED_UPDATE_FILE_IN_GALLERY',
  FILE_UPDATED_IN_GALLERY = 'FILE_UPDATED_IN_GALLERY',
  FILE_DELETED_IN_GALLERY = 'FILE_DELETED_IN_GALLERY',
  FAILED_DELETE_FILE_IN_GALLERY = 'FAILED_DELETE_FILE_IN_GALLERY',
  FAILED_GET_GALLERY = 'FAILED_GET_GALLERY',
  SEO_CREATED_SUCCESS = 'SEO_CREATED_SUCCESS',
  FAILED_CREATE_SEO = 'FAILED_CREATE_SEO',
  PRODUCT_CREATED_SUCCESS = 'PRODUCT_CREATED_SUCCESS',
  REGULAR_PRICE_SHOULD_BE_GREATER_THAN_DISCOUNTED_PRICE = 'REGULAR_PRICE_SHOULD_BE_GREATER_THAN_DISCOUNTED_PRICE',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  MOBILE_ALREADY_EXIST = 'MOBILE_ALREADY_EXIST',
  FAILED_CREATE_ADMIN_USER = 'FAILED_CREATE_ADMIN_USER',
  USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS',
  PASSWORD_EMAILED_FOR_YOU = 'PASSWORD_EMAILED_FOR_YOU',
  FAILED_SEND_PASSWORD_EMAIL = 'FAILED_SEND_PASSWORD_EMAIL',
  FAILED_EMAILED_PASSWORD_FOR_YOU = 'FAILED_EMAILED_PASSWORD_FOR_YOU',
  ACCESS_DENIED = 'ACCESS_DENIED',
  FILES_DELETED_SUCCESS = 'FILES_DELETED_SUCCESS',
  FAILED_DELETE_FILES = 'FAILED_DELETE_FILES',
  FAILED_RESET_PASSWORD = 'FAILED_RESET_PASSWORD',
  PASSWORD_RESET_EMAIL_SENT = 'PASSWORD_RESET_EMAIL_SENT',
  INVALID_OR_EXPIRED_TOKEN = 'INVALID_OR_EXPIRED_TOKEN',
  PASSWORD_RESET_SUCCESSFULLY = 'PASSWORD_RESET_SUCCESSFULLY',
  INVALID_EMAIL_OR_PASSWORD = 'INVALID_EMAIL_OR_PASSWORD',
  FAILED_GET_USERS_LIST = 'FAILED_GET_USERS_LIST',
  FAILED_DELETE_USERS = 'FAILED_DELETE_USERS',
  NOT_FOUND_USERS = 'NOT_FOUND_USERS',
  USERS_DELETED_SUCCESS = 'USERS_DELETED_SUCCESS',
  USER_UPDATED_SUCCESS = 'USER_UPDATED_SUCCESS',
  FAILED_UPDATE_USER = 'FAILED_UPDATE_USER',
  FAILED_DELETE_AVATAR = 'FAILED_DELETE_AVATAR',
  AVATAR_DELETED_SUCCESS = 'AVATAR_DELETED_SUCCESS',
  FAILED_SET_NEW_PASSWORD = 'FAILED_SET_NEW_PASSWORD',
  PASSWORD_SENT_FOR_USER = 'PASSWORD_SENT_FOR_USER',
  FAILED_SEND_PASSWORD_SMS = 'FAILED_SEND_PASSWORD_SMS',
  USERNAME_ALREADY_EXIST = 'USERNAME_ALREADY_EXIST',
  NATIONAL_ID_ALREADY_EXIST = 'NATIONAL_ID_ALREADY_EXIST',
  FAILED_CREATE_USER = 'FAILED_CREATE_USER',
  FAILED_CREATE_PASSWORD = 'FAILED_CREATE_PASSWORD',
  ADDRESS_CREATED_SUCCESS = 'ADDRESS_CREATED_SUCCESS',
  PARENT_CATEGORY_NOT_FOUND = 'PARENT_CATEGORY_NOT_FOUND',
  CATEGORY_CREATED_SUCCESS = 'CATEGORY_CREATED_SUCCESS',
  SEO_SLUG_ALREADY_EXIST = 'SEO_SLUG_ALREADY_EXIST',
  UPDATED_ROLES_SUCCESS = 'UPDATED_ROLES_SUCCESS',
  FAILED_UPDATE_ROLES = 'FAILED_UPDATE_ROLES',
  FAILED_GET_SEO_LIST = 'FAILED_GET_SEO_LIST',
  LOGOUTED_SUCCESS = 'LOGOUTED_SUCCESS',
  IMAGE_UPLOADED_SUCCESS = 'IMAGE_UPLOADED_SUCCESS',
  FAILED_UPLOAD_IMAGE = 'FAILED_UPLOAD_IMAGE',
  CATEGORIES_NOT_FOUND = 'CATEGORIES_NOT_FOUND',
  FAILED_CREATE_SHEET = 'FAILED_CREATE_SHEET',
  SHEET_CREATED_SUCCESS = 'SHEET_CREATED_SUCCESS',
  NOT_FOUND_SHEET = 'NOT_FOUND_SHEET',
  FAILED_UPDATE_SHEET = 'FAILED_UPDATE_SHEET',
  SHEET_UPDATED_SUCCESS = 'SHEET_UPDATED_SUCCESS',
  FAIELD_GET_SHEET_LIST = 'FAIELD_GET_SHEET_LIST',
  FAILED_CREATE_POST = 'FAILED_CREATE_POST',
  POST_CREATED_SUCCESS = 'POST_CREATED_SUCCESS',
  FAILED_UPDATE_POST = 'FAILED_UPDATE_POST',
  NOT_FOUND_POST = 'NOT_FOUND_POST',
  POST_UPDATED_SUCCESS = 'POST_UPDATED_SUCCESS',
  FAIELD_GET_POST_LIST = 'FAIELD_GET_POST_LIST',
  NOT_FOUND_SHEETS = 'NOT_FOUND_SHEETS',
  FAILED_DELETE_SHEETS = 'FAILED_DELETE_SHEETS',
  SHEETS_DELETED_SUCCESS = 'SHEETS_DELETED_SUCCESS',
  NOT_FOUND_POSTS = 'NOT_FOUND_POSTS',
  FAILED_DELETE_POSTS = 'FAILED_DELETE_POSTS',
  POSTS_DELETED_SUCCESS = 'POSTS_DELETED_SUCCESS',
  TITLE_IS_REQUIRED = 'TITLE_IS_REQUIRED',
  FILES_ADDED_TO_GALLERY = 'FILES_ADDED_TO_GALLERY',
  GIF_FILE_MUST_BE_ATLEAST_10MG = 'GIF_FILE_MUST_BE_ATLEAST_10MG',
  AUDIO_FILE_MUST_BE_ATLEAST_10MG = 'AUDIO_FILE_MUST_BE_ATLEAST_10MG',
  IMAGE_FILE_MUST_BE_ATLEAST_2MG = 'IMAGE_FILE_MUST_BE_ATLEAST_2MG',
  VIDEO_FILE_MUST_BE_ATLEAST_50MG = 'VIDEO_FILE_MUST_BE_ATLEAST_50MG',
  DISCOUNT_CODE_CREATED_SUCCESS = 'DISCOUNT_CODE_CREATED_SUCCESS',
  FAILED_CREATE_DISCOUNT_CODE = 'FAILED_CREATE_DISCOUNT_CODE',
  PLEASE_ENTER_A_DISCOUNT_CODE = 'PLEASE_ENTER_A_DISCOUNT_CODE',
  FAILED_UPDATE_DISCOUNT_CODE = 'FAILED_UPDATE_DISCOUNT_CODE',
  DISCOUNT_CODE_UPDATED_SUCCESS = 'DISCOUNT_CODE_UPDATED_SUCCESS',
  NOT_FOUNDS_DISCOUNT_CODES = 'NOT_FOUNDS_DISCOUNT_CODES',
  FAILED_DELETE_DISCOUNT_CODES = 'FAILED_DELETE_DISCOUNT_CODES',
  DISCOUNT_CODES_DELETED_SUCCESS = 'DISCOUNT_CODES_DELETED_SUCCESS',
  DISCOUNT_CODE_ALREADY_EXIST = 'DISCOUNT_CODE_ALREADY_EXIST',
  NOT_FOUND_DISCOUNT_CODE = 'NOT_FOUND_DISCOUNT_CODE',
  PROPERTY_CREATED_SUCCESS = 'PROPERTY_CREATED_SUCCESS',
  PROPERTY_SLUG_ALREADY_EXIST = 'PROPERTY_SLUG_ALREADY_EXIST',
  FAILED_CREATE_PROPERTY = 'FAILED_CREATE_PROPERTY',
}
