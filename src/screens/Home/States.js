const initialState = {
  userName: null,
  email: null,
  password: null,
  userNameError: null,
  emailError: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'userName':
      return {
        ...state,
        userName: action.payload,
      };
    case 'email':
      return {
        ...state,
        email: action.payload,
      };
    case 'password':
      return {
        ...state,
        password: action.payload,
      };
    case 'userNameError':
      return {
        ...state,
        userNameError: action.payload,
      };
    case 'emailError': {
      return {
        ...state,
        emailError: action.payload,
      };
    }
  }
};

export {initialState, reducer};
