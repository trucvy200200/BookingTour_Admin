import { GET_TOUR_LIST, GET_TOUR_BY_ID, GET_LATEST_TOUR, GET_HOT_TOUR } from "../action"

// ** Initial State
const initialState = {
  listTour: [],
  tourDetail: {},
  total: 1,
  params: {},
  tourLatest: [],
  tourHot: []
}

const tour = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOUR_LIST:
      return {
        ...state,
        listTour: action.data,
        total: action.totalPages,
        params: action.params
      }
    case GET_TOUR_BY_ID:
      return {
        ...state,
        tourDetail: action.data
      }
    case GET_LATEST_TOUR:
      return {
        ...state,
        tourLatest: action.data
      }
    case GET_HOT_TOUR:
      return {
        ...state,
        tourHot: action.data
      }
    default:
      return { ...state }
  }
}
export default tour
