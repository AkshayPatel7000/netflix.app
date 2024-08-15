import moment from 'moment';

export const maxNumberArrOfObj = (array, key) => {
  return Math.max.apply(
    Math,
    array.map(function (o) {
      return o[key];
    }),
  );
};

export const removeDuplicateFromArr = (array, key) => {
  const counterVar = new Set();

  const filteredArr = array.filter(el => {
    const duplicate = counterVar.has(el[key]);
    counterVar.add(el[key]);
    return !duplicate;
  });
  return filteredArr;
};

export const sortArrayAlphabatically = (arr, key) => {
  return arr.slice().sort((i, j) => {
    if (i[key] > j[key]) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const filterArrayByDate = (
  arr = [],
  mode = 'desc',
  dateKey = 'createdAt',
) => {
  return arr.sort(function (a, b) {
    if (
      a != null &&
      b != null &&
      typeof a === 'object' &&
      typeof b === 'object' &&
      dateKey in a &&
      dateKey in b
    ) {
      if (mode == 'desc') {
        return moment(a[dateKey]).isBefore(moment(b[dateKey]));
      } else {
        return moment(b[dateKey]).isBefore(moment(a[dateKey]));
      }
    } else {
      return false;
    }
  });
};
export const removeIndianLanguages = (data, key) => {
  // Define a list of Indian languages to remove (case-insensitive)
  const indianLanguages = [
    'TAMIL',
    'TELUGU',
    'KANNADA',
    'MARATHI',
    'GUJARATI',
    'BENGALI',
    'MALAYALAM', // Add more as needed
  ];

  // Function to check if a title contains any of the Indian languages
  function containsIndianLanguage(title) {
    // Convert title to uppercase to handle case-insensitive matching
    const titleUpperCase = title.toUpperCase();
    return indianLanguages.some(language => titleUpperCase.includes(language));
  }

  // Filter out objects where the title contains any Indian language
  return data.filter(item => !containsIndianLanguage(item[key]));
};
