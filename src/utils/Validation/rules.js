import {message} from './msg';

const emptyValidation = value => {
  if (value === undefined || value === null) {
    return message.empty;
  } else {
    return null;
  }
};

const emailValidation = value => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(value)) {
    return null;
  } else {
    return value ? message.email : message.empty;
  }
};

const userNameValidation = (value, msg) => {
  let regX = /^[a-zA-Z]+$/g;
  if (value === undefined || value === null) {
    return message.empty;
  } else if (regX.test(value)) {
    return null;
  } else {
    return value ? msg : message.empty;
  }
};

const validationServices = {
  emptyValidation,
  emailValidation,
  userNameValidation,
};

export default validationServices;
