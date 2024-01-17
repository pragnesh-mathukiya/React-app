import { faq_managementMap } from "./faqManagementAction";

const initialState = {
  isLoading: false,
  refreshFaqList: true,
  searchBy: "",
  faqList: {},
  searchText: "",
  searchStatus: "",
  skip: 0,
  faqSkip: 0,
  faqLimit: 10,
  column: "",
  dir: "",
  limit: 10,
  selectedFaq: {},
  createFaqModal: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case faq_managementMap.GET_FAQ_START: {
      return {
        ...state,
        isFaqLoading: true,
      };
    }
    case faq_managementMap.GET_FAQ_SUCCESS: {
      return {
        ...state,
        refreshFaqList: false,
        isFaqLoading: false,
        faqList: action.payload,
      };
    }
    case faq_managementMap.GET_FAQ_ERROR: {
      return {
        ...state,
        refreshFaqList: false,
        isFaqLoading: false,
        faqList: {},
      };
    }
    case faq_managementMap.SET_FAQ_BATCH_NUMBER: {
      return {
        ...state,
        faqSkip: action.payload,
        refreshFaqList: true,
      };
    }
    case faq_managementMap.SET_SELECTED_FAQ: {
      return {
        ...state,
        selectedFaq: action.payload,
      };
    }

    case faq_managementMap.UPDATE_FAQ_START: {
      return {
        ...state,
        isFaqLoading: true,
      };
    }
    case faq_managementMap.UPDATE_FAQ_SUCCESS: {
      return {
        ...state,
        isFaqLoading: false,
        refreshFaqList: true,
      };
    }
    case faq_managementMap.UPDATE_FAQ_ERROR: {
      return {
        ...state,
        isFaqLoading: false,
        refreshFaqList: false,
      };
    }
    case faq_managementMap.DELETE_FAQ_START: {
      return {
        ...state,
        isFaqLoading: true,
      };
    }
    case faq_managementMap.DELETE_FAQ_SUCCESS: {
      return {
        ...state,
        isFaqLoading: false,
        refreshFaqList: true,
      };
    }
    case faq_managementMap.DELETE_FAQ_ERROR: {
      return {
        ...state,
        isFaqLoading: false,
        refreshFaqList: false,
      };
    }
    case faq_managementMap.ADD_FAQ_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case faq_managementMap.ADD_FAQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshFaqList: true,
      };
    }
    case faq_managementMap.ADD_FAQ_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case faq_managementMap.CREATE_FAQ_MANAGEMENT_CLOSE: {
      return {
        ...state,
        createFaqModal: false,
      };
    }
    case faq_managementMap.CREATE_FAQ_MANAGEMENT_SHOW: {
      return {
        ...state,
        createFaqModal: true,
      };
    }
    default:
      return { ...state };
  }
};
