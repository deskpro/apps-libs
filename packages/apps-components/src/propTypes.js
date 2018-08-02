import React from "react";

export function isReactElement(
  propValue,
  key,
  componentName,
  location,
  propFullName,
) {
  if (!React.isValidElement(propValue)) {
    return new Error(
      'Invalid prop `' +
      propFullName +
      '` supplied to' +
      ' `' +
      componentName +
      '`. Validation failed.',
    );
  }
}
