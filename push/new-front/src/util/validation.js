const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const isConsistOfSpecial = (string) => {
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return format.test(string) ? true : false;
};

const isConsistOfNumber = (string) => {
  string = string.split('');
  const ans = false;
  string.forEach((el) => {
    if (!isNaN(el)) ans = true;
  });
  return ans;
};

export const validatePaymentAccount = (data) => {
  let errors = {};
  if (isEmpty(data.name)) {
    errors.name = 'Name must not be empty.';
  } else if (isConsistOfSpecial(data.name)) {
    errors.name = 'Cannot use special characters.';
  } else if (isConsistOfNumber(data.name)) {
    errors.name = 'Cannot use number.';
  }

  if (isEmpty(data.email)) {
    errors.email = 'Email must not be empty.';
  } else if (!isEmail(data.email)) {
    errors.email = 'Invalid email address format.';
  }

  if (isEmpty(data.TIN)) {
    errors.TIN = 'TIN must not be empty.';
  } else if (isConsistOfSpecial(data.TIN)) {
    errors.TIN = 'Cannot use special characters.';
  } else if (!isConsistOfNumber(data.TIN)) {
    errors.TIN = 'Number only.';
  }

  if (isEmpty(data.account_type)) {
    errors.account_type = 'Please select one.';
  }

  if (isEmpty(data.account_name)) {
    errors.account_name = 'Account name must not be empty.';
  } else if (isConsistOfSpecial(data.account_name)) {
    errors.account_name = 'Cannot use special characters.';
  } else if (isConsistOfNumber(data.account_name)) {
    errors.account_name = 'Cannot use number.';
  }

  if (isEmpty(data.account_number)) {
    errors.account_number = 'Account number must not be empty.';
  } else if (isConsistOfSpecial(data.account_number)) {
    errors.account_number = 'Cannot use special characters.';
  } else if (!isConsistOfNumber(data.account_number)) {
    errors.account_number = 'Number only.';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateSignupData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email must not be empty.';
  } else if (!isEmail(data.email)) {
    errors.email = 'Invalid format email address.';
  }

  if (isEmpty(data.name)) {
    errors.name = 'Must not be empty';
  } else if (isConsistOfSpecial(data.name)) {
    errors.name = 'Must be String only';
  } else if (isConsistOfNumber(data.name)) {
    errors.name = 'Must not constrain a number';
  }

  if (isEmpty(data.surName)) {
    errors.surName = 'Must not be empty';
  } else if (isConsistOfSpecial(data.surName)) {
    errors.surName = 'Must be String only';
  } else if (isConsistOfNumber(data.surName)) {
    errors.surName = 'Must not constrain a number';
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  else if (data.password.length < 6) {
    errors.password = 'Must be at least 6 characters';
  }
  // if (data.password !== data.confirmPassword)
  //   errors.confirmPassword = "Passwords must match";

  if (isEmpty(data.phone)) errors.phone = 'Must not be empty';
  else if (isNaN(data.phone)) {
    errors.phone = 'must be a number';
  } else if (data.phone.length != 10) {
    errors.phone = 'must have 10 length';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  else if (data.password.length < 6) {
    errors.password = 'Must be at least 6 characters';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    // https://website.com
    if (data.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};

export const validateAddEmployee = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = 'Email must not be empty.';
  } else if (!isEmail(data.email)) {
    errors.email = 'Invalid format email address.';
  }

  if (isEmpty(data.name)) {
    errors.name = 'Must not be empty';
  } else if (isConsistOfSpecial(data.name)) {
    errors.name = 'Must be String only';
  } else if (isConsistOfNumber(data.name)) {
    errors.name = 'Must not constrain a number';
  }

  if (isEmpty(data.surName)) {
    errors.surName = 'Must not be empty';
  } else if (isConsistOfSpecial(data.surName)) {
    errors.surName = 'Must be String only';
  } else if (isConsistOfNumber(data.surName)) {
    errors.surName = 'Must not constrain a number';
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  else if (data.password.length < 6) {
    errors.password = 'Must be at least 6 characters';
  }
  // if (data.password !== data.confirmPassword)
  //   errors.confirmPassword = 'Passwords must match';

  if (isEmpty(data.phone)) errors.phone = 'Must not be empty';
  else if (isNaN(data.phone)) {
    errors.phone = 'must be a number';
  } else if (data.phone.length != 10) {
    errors.phone = 'must have 10 length';
  }

  if (isEmpty(data.role)) {
    errors.account_type = 'Please select one.';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateAddMenuType = (typeName) => {
  const errors = {};
  if (isEmpty(typeName)) {
    errors.typeName = 'Must not be empty';
  } else if (isConsistOfSpecial(typeName)) {
    errors.typeName = 'Must be String only';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
export const validateAddMenuItem = (item, price) => {
  console.log('check item = ', item);
  console.log('check price = ', price);
  const errorsMi = {};
  console.log('itemvali', item, 'pricevali', price);

  if (isEmpty(item)) {
    errorsMi.menuItemName = 'Must not be empty';
  }
  if (isConsistOfSpecial(item)) {
    errorsMi.menuItemName = 'Must be String only';
  }
  if (isEmpty(price)) {
    errorsMi.menuItemPrice = 'Must not be empty';
  }

  console.log('errorsvali', errorsMi);
  return {
    errorsMi,
    validMi: Object.keys(errorsMi).length === 0 ? true : false,
  };
};

export const validateAddMenu = (data, item, price) => {
  const errors = {};
  if (isEmpty(data.menuName)) {
    errors.menuName = 'Must not be empty';
  }
  if (isConsistOfSpecial(data.menuName)) {
    errors.menuName = 'Must be String only';
  }
  if (isEmpty(data.menuType)) {
    errors.menuType = 'Must not be empty';
  }
  if (data.menuItemName === true) {
    errors.menuItem = 'Must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateEditMenuItem = (item) => {
  console.log('item = ', item);
  const errors = '';
  if (isEmpty(item)) {
    errors = 'Must not be empty';
  }
  if (isConsistOfSpecial(item)) {
    errors = 'Must be String only';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
