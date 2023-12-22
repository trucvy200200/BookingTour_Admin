import instances from "../../../../@core/plugin/axios"

export const GET_TOUR_LIST = "GET_TOUR_LIST"
export const GET_TOUR_BY_ID = "GET_TOUR_BY_ID"
export const GET_LATEST_TOUR = "GET_LATEST_TOUR"
export const GET_HOT_TOUR = "GET_HOT_TOUR"
export const getTourList = (params) => {
    return async (dispatch) => {
        return await instances.post("/api/filter-tour", params).then((response) => {
            const data = response?.data?.tourData?.data.slice(params.fromPage, params.toPage)
            dispatch({
                type: GET_TOUR_LIST,
                data: data,
                totalPages: response?.data?.tourData?.data.length,
                params: params
            })
            return response
        })
    }
}

export const getTourById = (id) => {
    return async (dispatch) => {
        return await instances.post("/api/get-tour-by-id", { id: id }).then((response) => {
            dispatch({
                type: GET_TOUR_BY_ID,
                data: response?.data?.tourData,
            })
            return response
        })
    }
}


export const getLatestTour = (id) => {
    return async (dispatch) => {
        return await instances.get("/api/latest-tour").then((response) => {
            dispatch({
                type: GET_LATEST_TOUR,
                data: response?.data?.tourData?.data,
            })
            return response
        })
    }
}

export const getHotTour = (id) => {
    return async (dispatch) => {
        return await instances.get("/api/hot-tour").then((response) => {
            dispatch({
                type: GET_HOT_TOUR,
                data: response?.data?.tourData?.data,
            })
            return response
        })
    }
}