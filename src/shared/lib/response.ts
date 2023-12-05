export const success = <T>(data: T) => ({ type: 'success', data });
export const failure = <T>(reason: T) => ({ type: 'failure', reason });
