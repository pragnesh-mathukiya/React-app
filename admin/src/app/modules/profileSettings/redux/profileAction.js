export const ProfileMap = {
  UPDATE_PROFILE_START: "UPDATE_PROFILE_START",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_ERROR: "UPDATE_PROFILE_ERROR",
  RESET_PASSWORD_START: "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR",
  CHANGE_EMAIL_REQUEST_START: "CHANGE_EMAIL_REQUEST_START",
  CHANGE_EMAIL_REQUEST_SUCCESS: "CHANGE_EMAIL_REQUEST_SUCCESS",
  CHANGE_EMAIL_REQUEST_ERROR: "CHANGE_EMAIL_REQUEST_ERROR",
  UPDATE_EMAIL_START: "UPDATE_EMAIL_START",
  UPDATE_EMAIL_SUCCESS: "UPDATE_EMAIL_SUCCESS",
  UPDATE_EMAIL_ERROR: "UPDATE_EMAIL_ERROR",
  CHANGE_CONTACT_REQUEST_START: "CHANGE_CONTACT_REQUEST_START",
  CHANGE_CONTACT_REQUEST_SUCCESS: "CHANGE_CONTACT_REQUEST_SUCCESS",
  CHANGE_CONTACT_REQUEST_ERROR: "CHANGE_CONTACT_REQUEST_ERROR",
  UPDATE_CONTACT_START: "UPDATE_CONTACT_START",
  UPDATE_CONTACT_SUCCESS: "UPDATE_CONTACT_SUCCESS",
  UPDATE_CONTACT_ERROR: "UPDATE_CONTACT_ERROR",
  OPEN_EMAIL_CHANGE_PROFILE_MODAL: "OPEN_EMAIL_CHANGE_PROFILE_MODAL",
  CLOSE_EMAIL_CHANGE_PROFILE_MODAL: "CLOSE_EMAIL_CHANGE_PROFILE_MODAL",
  OPEN_CONTACT_CHANGE_PROFILE_MODAL: "OPEN_CONTACT_CHANGE_PROFILE_MODAL",
  CLOSE_CONTACT_CHANGE_PROFILE_MODAL: "CLOSE_CONTACT_CHANGE_PROFILE_MODAL",
  UPLOAD_IMAGE_START: "UPLOAD_IMAGE_START",
  UPLOAD_IMAGE_SUCCESS: "UPLOAD_IMAGE_SUCCESS",
  UPLOAD_IMAGE_ERROR: "UPLOAD_IMAGE_ERROR",
};

export const ProfileActions = {
  openEmailChangeModal: () => ({
    type: ProfileMap.OPEN_EMAIL_CHANGE_PROFILE_MODAL,
  }),
  closeEmailChangeModal: () => ({
    type: ProfileMap.CLOSE_EMAIL_CHANGE_PROFILE_MODAL,
  }),

  openContactChangeModal: () => ({
    type: ProfileMap.OPEN_CONTACT_CHANGE_PROFILE_MODAL,
  }),
  closeContactChangeModal: () => ({
    type: ProfileMap.CLOSE_CONTACT_CHANGE_PROFILE_MODAL,
  }),

  profileUpdateStart: () => ({ type: ProfileMap.UPDATE_PROFILE_START }),
  profileUpdateSuccess: (data) => ({
    type: ProfileMap.UPDATE_PROFILE_SUCCESS,
    payload: data,
  }),
  profileUpdateError: (errors) => ({
    type: ProfileMap.UPDATE_PROFILE_ERROR,
    payload: { errors },
  }),

  resetPasswordStart: (data) => ({
    type: ProfileMap.RESET_PASSWORD_START,
    payload: data,
  }),
  resetPasswordSuccess: (data) => ({
    type: ProfileMap.RESET_PASSWORD_SUCCESS,
    payload: data,
  }),
  resetPasswordError: (errors) => ({
    type: ProfileMap.RESET_PASSWORD_ERROR,
    payload: { errors },
  }),

  changeEmailRequestStart: (data) => ({
    type: ProfileMap.CHANGE_EMAIL_REQUEST_START,
    payload: data,
  }),
  changeEmailRequestSuccess: (data) => ({
    type: ProfileMap.CHANGE_EMAIL_REQUEST_SUCCESS,
    payload: data,
  }),
  changeEmailRequestError: (errors) => ({
    type: ProfileMap.CHANGE_EMAIL_REQUEST_ERROR,
    payload: { errors },
  }),

  updateEmailStart: (data) => ({
    type: ProfileMap.UPDATE_EMAIL_START,
    payload: data,
  }),
  updateEmailSuccess: (data) => ({
    type: ProfileMap.UPDATE_EMAIL_SUCCESS,
    payload: data,
  }),
  updateEmailError: (errors) => ({
    type: ProfileMap.UPDATE_EMAIL_ERROR,
    payload: { errors },
  }),

  changeContactRequestStart: (data) => ({
    type: ProfileMap.CHANGE_CONTACT_REQUEST_START,
    payload: data,
  }),
  changeContactRequestSuccess: (data) => ({
    type: ProfileMap.CHANGE_CONTACT_REQUEST_SUCCESS,
    payload: data,
  }),
  changeContactRequestError: (errors) => ({
    type: ProfileMap.CHANGE_CONTACT_REQUEST_ERROR,
    payload: { errors },
  }),

  updateContactStart: (data) => ({
    type: ProfileMap.UPDATE_CONTACT_START,
    payload: data,
  }),
  updateContactSuccess: (data) => ({
    type: ProfileMap.UPDATE_CONTACT_SUCCESS,
    payload: data,
  }),
  updateContactError: (errors) => ({
    type: ProfileMap.UPDATE_CONTACT_ERROR,
    payload: { errors },
  }),

  updateProfileSuccess: (data) => ({
    type: ProfileMap.UPDATE_PROFILE_SUCCESS,
    payload: data,
  }),
  uploadImageStart: () => ({ type: ProfileMap.UPLOAD_IMAGE_START }),
  uploadImageSuccess: (data) => ({
    type: ProfileMap.UPLOAD_IMAGE_SUCCESS,
    payload: data,
  }),
  uploadImageError: (errors) => ({
    type: ProfileMap.UPLOAD_IMAGE_ERROR,
    payload: { errors },
  }),
};
