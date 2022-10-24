/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { defaultParams, formatConsoleDate, LoggerParams } from './types';
import emoji from 'node-emoji';

/**
 * Based on Nurech logger {https://github.com/Nurech/logging-decorator/blob/master/src/app/decorators/logger.ts}.
 * @decorate @Logger() The Logger decorator is added at the beginning of the desired function.
 * We have the following configuration sparameters:
 * type?: 'error' | 'warn' | 'info' | 'debug' | 'log' | 'trace'; => Log type.
 * inputsParamsParams?: boolean;                                 => Show or not the function parameters
 * outputsReturned?: boolean;                                    => Whether or not to display returned values
 * prodMode?: boolean;                                           => Display or not the logs in production
 * timeStamp?: boolean;                                          => Whether or not to show the time in the log
 *
 * It takes a function and returns a new function that logs the input and output of the original
 * function
 * @param {LoggerParams} [params] - LoggerParams
 * @returns A function that takes in a target, funcName, and descriptor.
 */
export function Logger(params?: LoggerParams): (target: any, funcName: string, descriptor: PropertyDescriptor) => void {
  const options: Required<LoggerParams> = {
    type: params?.type || defaultParams.type,
    inputsParams: params?.inputsParams === undefined ? defaultParams.inputsParams : params.inputsParams,
    outputsReturned: params?.outputsReturned === undefined ? defaultParams.outputsReturned : params.outputsReturned,
    prodMode: params?.prodMode === undefined ? defaultParams.prodMode : params.prodMode,
    timeStamp: params?.timeStamp === undefined ? defaultParams.timeStamp : params.timeStamp,
  };

  return function (target: any, _funcName: string, descriptor: PropertyDescriptor) {
    if (!options.prodMode) {
      return;
    }

    // Function method
    const func = descriptor.value;

    /* Getting the parameter names of the method that is being decorated. */
    const paramNames = descriptor.value
      .toString()
      .replace(/\s/g, '')
      .match(/\((.*?)\)/)[1]
      .split(',');

    descriptor.value = function (...args: any[]) {
      const paramValues: any[] = args.map(arg => arg);
      let nameValue: any = {};
      /* Creating a nameValue object with the parameter names and values. */
      if (paramValues.length === paramNames.length) {
        for (let i = 0; i < paramNames.length; i++) {
          nameValue = { ...nameValue, ...{ [paramNames[i]]: paramValues[i] } };
        }
      }

      const result = func.apply(this, args);

      let timeStamp = '';
      if (options.timeStamp) {
        timeStamp = formatConsoleDate(new Date());
      }

      // Only inputsParams
      if (params?.inputsParams && !params?.outputsReturned) {
        console[options.type](
          timeStamp,
          `${emoji.emojify(options.type)} INVOKE ==> ${target?.constructor?.name}: ${func.name}() Params: =>`,
          nameValue,
        );
      }

      // Only outputsReturned
      else if (!params?.inputsParams && params?.outputsReturned) {
        console[options.type](
          timeStamp,
          `${emoji.emojify(options.type)} INVOKE ==> ${target?.constructor?.name}: ${func.name} () Returned Value: =>`,
          result,
        );
      }

      // Input and Output
      else {
        console[options.type](
          timeStamp,
          `${emoji.emojify(options.type)} INVOKE ==> ${target?.constructor?.name}: ${func.name}() Params: =>`,
          nameValue,
          `Returned Value: =>`,
          result,
        );
      }

      return result;
    };
  };
}
