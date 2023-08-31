import { ChangeEvent, useState, useMemo, useCallback } from 'react';

export interface FieldValidation<T> {
  field: keyof T;
  validate: (value: T[keyof T], fields: T) => string | null;
  defaultValue?: T[keyof T];
}

interface FormValidationResult<T> {
  fields: T;
  isValid: boolean;
}

const getInitialFields = <T>(validateRules: ValidateRules<T>) => {
  const initialFields = {} as T;
  validateRules.forEach((rule) => {
    if (rule.defaultValue !== undefined) {
      initialFields[rule.field] = rule.defaultValue;
    }
  });
  return initialFields;
};

export type ValidateRules<T> = FieldValidation<T>[];

export const useFormValidator = <T>(validateRules: ValidateRules<T>) => {
  const initialFields = useMemo(
    () => getInitialFields(validateRules),
    [validateRules]
  );

  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({} as Record<keyof T, string | null>);
  const validateForm = () => {
    const newErrors = {} as Record<keyof T, string | null>;
    validateRules.forEach(({ field, validate }) => {
      const error = validate(fields[field], fields);
      newErrors[field] = error;
    });
    setErrors(newErrors);
    return newErrors;
  };

  const validateField = (fieldName: keyof T) => {
    const rule = validateRules.find((r) => r.field === fieldName);
    if (!rule) {
      return;
    }
    const error = rule.validate(fields[fieldName], fields);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleBlur = (fieldName: keyof T) => {
    const isFieldValue = !!fields[fieldName];
    if (isFieldValue) {
      validateField(fieldName);
    }
  };

  const handleFocus = (fieldName: keyof T) => {
    setErrors((prev) => ({ ...prev, [fieldName]: null }));
  };

  const handleChange = (filedName: keyof T, value: T[keyof T]) => {
    setFields((prev) => ({ ...prev, [filedName]: value }));
  };

  const getFormValidationResult = (): FormValidationResult<T> => {
    const newErrors = validateForm();
    return {
      fields,
      isValid: Object.values(newErrors).every((error) => !error),
    };
  };

  const getSetFieldFunc = (fieldName: keyof T) => {
    return (value: T[keyof T]) => handleChange(fieldName, value);
  };

  const getFieldProps = (fieldName: keyof T) => {
    const commonProps = {
      onBlur: () => handleBlur(fieldName),
      onFocus: () => handleFocus(fieldName),
    };
    if (typeof fields[fieldName] === 'boolean')
      return {
        ...commonProps,
        checked: fields[fieldName] || false,
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          handleChange(fieldName, e.target.checked as T[keyof T]),
      } as React.InputHTMLAttributes<HTMLInputElement>;

    return {
      ...commonProps,
      value: fields[fieldName] || '',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        handleChange(fieldName, e.target.value as T[keyof T]),
    } as React.InputHTMLAttributes<HTMLInputElement>;
  };

  const setFieldValues = useCallback((newFields: Partial<T>) => {
    setFields((prev) => ({ ...prev, ...newFields }));
  }, []);

  const getInputProps = (fieldName: keyof T) => {
    return {
      ...getFieldProps(fieldName),
      error: errors[fieldName],
    };
  };

  return {
    getFormValidationResult,
    getSetFieldFunc,
    getFieldProps,
    setFieldValues,
    getInputProps,
    errors,
  };
};
