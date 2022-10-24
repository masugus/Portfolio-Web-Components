/* Defining the interface for the LoggerParams. */
export interface LoggerParams {
  type?: 'error' | 'warn' | 'info' | 'debug' | 'log' | 'trace';
  inputsParams?: boolean;
  outputsReturned?: boolean;
  prodMode?: boolean;
  timeStamp?: boolean;
}

/* Defining a constant called emojiForType that is an object with the keys of error, warn, info, debug,
log, and trace. */
export const emojiForType = {
  error: ':smiling_imp:',
  warn: ':partly_sunny:',
  info: ':test_tube:',
  debug: ':compass:',
  log: ':world_map:',
  trace: ':desktop_computer:',
};

/* Setting the default values for the LoggerParams. */
export const defaultParams: Required<LoggerParams> = {
  type: 'log',
  inputsParams: true,
  outputsReturned: true,
  prodMode: false,
  timeStamp: true,
};

/**
 * It takes a date object and returns a string in the format of [HH:MM:SS.mmm]
 * @param {Date} date - The date to format.
 * @returns A function that takes a date and returns a string.
 */
export function formatConsoleDate(date: Date): string {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return (
    '[' +
    (hour < 10 ? '0' + hour : hour) +
    ':' +
    (minutes < 10 ? '0' + minutes : minutes) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds) +
    '.' +
    ('00' + milliseconds).slice(-3) +
    ']'
  );
}
