export const sleep = (seconds) => {
  return new Promise((resolve) => setTimeout(resolve, seconds));
};

export const checkUndefined = (obj, name) => {
  if (typeof obj === "undefined") {
    throw new Error(`${name} must not be left undefined`);
  }
};

export const checkParams = (...params) => {
  if (params.some((elem) => elem === undefined)) {
    throw new Error(`Missing parameter at index ${params.indexOf(undefined)}`);
  }
};

export const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d);
};

export const parseParameters = ({
  args,
  argName,
  envName,
  defaultValue,
  list,
}) => {
  // Prioritize the arguments given by terminal.
  if (args.includes(argName)) {
    let argList = [];
    for (let i = args.indexOf(argName) + 1; i < args.length; i++) {
      if (args[i].includes("--")) break;
      argList.push(args[i]);
    }
    return list ? argList : argList[0];
  }
  // If param is not given by terminal, then look fot ir on env variable.
  if (process.env[envName]) {
    return process.env[envName];
  }
  // If it isn't anywhere, then return the default value.
  return defaultValue;
};

export const checkRequiredFields = (obj, requiredFields) => {
  requiredFields.forEach((field) => {
    checkUndefined(obj[field], field);
  });
};

export const checkEmptyFields = (obj, emptyFields) => {
  emptyFields.forEach((field) => {
    if (typeof obj[field] !== "undefined") {
      if (obj[field] === null || obj[field] === "") {
        throw new Error(`${field} must not be left empty`);
      }
    }
  });
};

export const checkFieldTypes = (obj, fieldTypes) => {
  Object.keys(fieldTypes).forEach((field) => {
    if (typeof obj[field] !== "undefined") {
      if (typeof obj[field] !== fieldTypes[field]) {
        throw new Error(`${field} must be of type ${fieldTypes[field]}`);
      }
    }
  });
};

export const getNonUndefinedFields = (obj, fields) => {
  const nonUndefinedFields = {};
  fields.forEach((field) => {
    if (typeof obj[field] !== "undefined") {
      nonUndefinedFields[field] = obj[field];
    }
  });
  return nonUndefinedFields;
};

export const getDefinedValues = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== "undefined") {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
