export default class Helpers {
  static canBeSpread(variable) {
    return variable != null && typeof variable[Symbol.iterator] === 'function';
  }

  static getValidationRulesForHexInput() {
    return { required: true, pattern: '^#(?:[0-9a-fA-F]{3}){1,2}$', validationMessage: 'Please input a HEX number (e.g. #FFA)' };
  }

  static getValidationRulesForNumericInput() {
    return { required: true, type: 'number', validationMessage: 'Please input a number' };
  }

  static getValidationRulesForNumericInput(minValue, maxValue) {
    return {
      required: true, type: 'number', min: minValue, max: maxValue, validationMessage: `Please input a number bewteen ${minValue} and ${maxValue}`,
    };
  }

  static getValidationRulesForTextInput(minLength, maxLength) {
    return { required: true, pattern: `.{${minLength},${maxLength}}`, validationMessage: `Text length must be between ${minLength} and ${maxLength} characters` };
  }
}
