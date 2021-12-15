export function createControl(config, validation) {
  return {
    ...config,
    valid: !validation,
    touched: false,
    value: '',
    validation,
  };
}
