// ** UseJWT import to get config
import UseJwt from "../../../@core/auth/jwt/useJwt"
import axios from "axios"
import { BASE_CONSTANT } from "../../../constants/base-constant"
import instances from "../../../@core/plugin/axios"
const config = UseJwt.jwtConfig

export const LOAD_USER_DATA = 'LOAD_USER_DATA'
export const SAVE_DATA_LOGIN = 'SAVE_DATA_LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'

// ** Handle Save Data Login
export const handleSaveDataLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_DATA_LOGIN,
      data
    })
  }
}

export const handleLogin = (data) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      data,
    })
    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem(config.storageTokenKeyName, data.token)
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT
    })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem(config.storageUserData)
    localStorage.removeItem(config.storageTokenKeyName)
  }
}

export const logout = (id, setLoading, handleSuccess) => {
  return (dispatch) => {
    setLoading(true)
    instances
      .post("/api/logout", { id: id })
      .then(() => {
        setLoading(false)
        handleSuccess()
        dispatch(handleLogout())
      })
      .catch(() => {
        setLoading(false)
      })
  }
}
export const loadUserData = () => {
  const data = JSON.parse(localStorage.getItem(config.storageUserData))
  return (dispatch) => {
    dispatch({ type: LOAD_USER_DATA, data: data })
  }
}

export const login2FA = (data, accessToken, handleSuccess, handleError, setLoading, ability, dataLogin) => {
  return (dispatch) => {
    const instances = axios.create({
      baseURL: BASE_CONSTANT.BASE_URL
    })
    instances.interceptors.request.use(
      (config) => {
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    instances
      .post("/auth/user/2fa/authenticate", data)
      .then((res) => {
        setLoading(false)
        if (!res?.data?.error && res?.data?.code === 0) {
          ability.update(dataLogin?.ability)
          dispatch(handleLogin(dataLogin))
          handleSuccess()
        } else {
          handleError(res?.data?.message)
        }
      })
      .catch(() => {
        handleError("Something went wrong, please try later")
        setLoading(false)
      })
  }
}

export const updateTokenFirebaseUser = async (data) => {
  return await instances.post("/auth/user/update-firebase", data)
}