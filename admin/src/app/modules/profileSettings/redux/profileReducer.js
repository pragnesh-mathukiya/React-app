import { ProfileMap } from "./profileAction";

const initialState = {
  isLoading: false,
  profileEmailChangeModal: false,
  showContactTimer: false,
  showEmailTimer: false,
  profileContactChangeModal: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ProfileMap.OPEN_EMAIL_CHANGE_PROFILE_MODAL: {
      return {
        ...state,
        profileEmailChangeModal: true,
      };
    }
    case ProfileMap.CLOSE_EMAIL_CHANGE_PROFILE_MODAL: {
      return {
        ...state,
        profileEmailChangeModal: false,
      };
    }
    case ProfileMap.OPEN_CONTACT_CHANGE_PROFILE_MODAL: {
      return {
        ...state,
        profileContactChangeModal: true,
      };
    }
    case ProfileMap.CLOSE_CONTACT_CHANGE_PROFILE_MODAL: {
      return {
        ...state,
        profileContactChangeModal: false,
      };
    }

    case ProfileMap.RESET_PASSWORD_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProfileMap.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProfileMap.RESET_PASSWORD_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProfileMap.CHANGE_EMAIL_REQUEST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProfileMap.CHANGE_EMAIL_REQUEST_SUCCESS: {
      return {
        ...state,
        showEmailTimer: true,
        isLoading: false,
      };
    }
    case ProfileMap.CHANGE_EMAIL_REQUEST_ERROR: {
      return {
        ...state,
        showEmailTimer: false,
        isLoading: false,
      };
    }
    case ProfileMap.CHANGE_CONTACT_REQUEST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProfileMap.CHANGE_CONTACT_REQUEST_SUCCESS: {
      return {
        ...state,
        showContactTimer: true,
        isLoading: false,
      };
    }
    case ProfileMap.CHANGE_CONTACT_REQUEST_ERROR: {
      return {
        ...state,
        showContactTimer: false,
        isLoading: false,
      };
    }
    default:
      return { ...state };
  }
};
