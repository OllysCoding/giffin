// Copyright 2025 olly
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

export enum ResultStatus {
  SUCCESS,
  ERROR,
}

export interface Failure {
  message: string;
  e?: unknown;
}

export interface SuccessResult<T> {
  status: ResultStatus.SUCCESS;
  result: T;
}
export interface FailureResult {
  status: ResultStatus.ERROR;
  error: Failure;
}

export type Result<T> = SuccessResult<T> | FailureResult;

export const success = <T>(result: T): SuccessResult<T> => {
  return {
    status: ResultStatus.SUCCESS,
    result,
  };
};

export const failure = (message: string, e?: unknown): FailureResult => {
  return {
    status: ResultStatus.ERROR,
    error: {
      message,
      e: e ?? undefined,
    },
  };
};

export const isSuccess = <T>(result: Result<T>): result is SuccessResult<T> =>
  result.status === ResultStatus.SUCCESS;

export const isFailure = <T>(result: Result<T>): result is FailureResult =>
  result.status === ResultStatus.ERROR;

export const unwrap = <T>(result: Result<T>): T | undefined => {
  if (isSuccess(result)) return result.result;
  else return undefined;
};
