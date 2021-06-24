import axios from "axios";

const TOKEN = "token";

//ACTION TYPES

const SET_USERS = "SET_USERS";
const ADD_USER = "ADD_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_USER = "UPDATE_USER";

//ACTION CREATORS

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};
export const addedUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

export const removeUser = (user) => {
  return {
    type: REMOVE_USER,
    user,
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

//THUNK CREATORS

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data } = await axios.get("/api/users/admin", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUsers(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addingUser = (newUser, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/users", newUser);
      dispatch(addedUser(data));
      history.push("/users/");
    } catch (error) {
      console.error(error);
    }
  };
};

//These next 2 are for tier 2 features.
//The api routes don't exists yet and need to be written before we can test or used them.
export const deleteUser = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/users/${id}`);
    dispatch(removeUser(data));
  };
};

export const updatingUser = (id, user) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/users/${id}`, user);
    dispatch(updateUser(data));
  };
};

export const editUserType = (id, type) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${id}/editUserType`, {
        usertype: type,
      });
      dispatch(updateUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// USER SUB_REDUCER
export default function allUsersReducer(users = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case ADD_USER:
      return [...users, action.user];
    case REMOVE_USER:
      return users.filter((user) => user.id !== action.user.id);
    case UPDATE_USER:
      return users.map((user) =>
        user.id === action.user.id ? action.user : user
      );
    default:
      return users;
  }
}
