import React, { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: {
    _id:"64f1dd58291b584184d2085c",
username:"hello3",
email:"hello3@mail.com",
profilePicture:"",
coverPicture:"",
followers:[],
following:[],
isAdmin:false,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const authReducer = (state, action) =>{
    switch(action.type) {
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false,
            };
            case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isFetching:false,
                error:false,
            };
            case "LOGIN_FAILURE":
            return{
                user:null,
                isFetching:false,
                error:action.payload,
            };
            case "FOLLOW":
            return{
                user:action.payload
            };
            case "UNFOLLOW":
            return{
                user:action.payload
            }
            default:
                return state
    }
}

  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
