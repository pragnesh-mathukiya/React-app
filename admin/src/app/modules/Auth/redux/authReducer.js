import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthMap } from "./authAction";
import { ProfileMap } from "../../profileSettings/redux/profileAction";

const initialState = {
  user: null,
  authToken: null,
  isLoading: false,
  redirectLogin: false,
  message: "",
  errors: "",
  isOtpVerified: false,
  flashMessage: "",
  tokenVerified: false,
  notificationList: {},
};

const persistConfig = {
  storage,
  key: "v706-demo1-auth",
  whitelist: ["user", "authToken"],
};

export const reducer = persistReducer(
  persistConfig,
  (state = initialState, action) => {
    switch (action.type) {
      case AuthMap.LOGIN_START: {
        return {
          ...state,
          isLoading: true,
          flashMessage: "",
        };
      }
      case AuthMap.LOGIN_SUCCESS: {
        return {
          ...state,
          user: action.payload,
          authToken: action.payload.accessToken,
          isLoading: false,
          isOtpVerified: action.payload.twoFactorAuthentication ? false : true,
          flashMessage: "",
        };
      }
      case AuthMap.LOGIN_ERROR: {
        return {
          ...state,
          isLoading: false,
          flashMessage: action.payload,
        };
      }
      case AuthMap.LOGOUT_ERROR: {
        return {
          ...initialState,
        };
      }
      case AuthMap.LOGOUT_SUCCESS: {
        return {
          ...initialState,
        };
      }
      case AuthMap.FORGOT_PASSWORD_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          message: action.payload,
          redirectLogin: true,
          errors: "",
        };
      }
      case AuthMap.FORGOT_PASSWORD_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.SET_NEW_PASSWORD_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.SET_NEW_PASSWORD_SUCCESS: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.SET_NEW_PASSWORD_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.VERIFY_LOGIN_SECURITY_CODE_START: {
        return {
          ...state,
          isLoading: true,
          flashMessage: "",
        };
      }
      case AuthMap.VERIFY_LOGIN_SECURITY_CODE_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          authToken: action.payload.token,
          flashMessage: "",
        };
      }
      case AuthMap.VERIFY_LOGIN_SECURITY_CODE_ERROR: {
        return {
          ...state,
          isLoading: false,
          flashMessage: action.payload,
        };
      }
      case AuthMap.VERIFY_AUTH_TOKEN_SUCCESS: {
        return {
          ...state,
          tokenVerified: true,
          authToken: action.payload,
          user: {
            ...state.user,
            token: action.payload,
          },
        };
      }
      case AuthMap.VERIFY_AUTH_TOKEN_ERROR: {
        return {
          ...initialState,
          tokenVerified: true,
        };
      }
      case AuthMap.RESET_AUTH: {
        return {
          ...initialState,
        };
      }
      case ProfileMap.UPDATE_PROFILE_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case ProfileMap.UPDATE_PROFILE_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          user: action.payload,
        };
      }
      case ProfileMap.UPDATE_PROFILE_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.NOTIFICATION_LIST_START: {
        return {
          ...state,
          //isLoading: true,
        };
      }
      case AuthMap.NOTIFICATION_LIST_SUCCESS: {
        return {
          ...state,
          //isLoading: false,
          notificationList: action.payload,
        };
      }
      case AuthMap.NOTIFICATION_LIST_ERROR: {
        return {
          ...state,
          //isLoading: false,
        };
      }
      default:
        return { ...state };
    }
  }
);
