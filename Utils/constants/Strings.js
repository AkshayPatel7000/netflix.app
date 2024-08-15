export default class StringsConstants {
  static permissionContact = {
    title: 'Contacts',
    message: 'The Bounce app would like to view your contacts.',
    buttonPositive: 'Please accept permission',
  };
  static requiredFieldError = (title = '') => {
    return ` ${title} is required.`;
  };
  static minimumFieldError = (title = '', len = 0) => {
    return `${title} should be ${len}`;
  };
}
