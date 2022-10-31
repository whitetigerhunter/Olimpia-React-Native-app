export const getRandomArrayElements = (array: any[], numberOfElements: number) =>
  array.sort(() => Math.random() - Math.random()).slice(0, numberOfElements);

export const isString = (arg: any): arg is string => typeof arg === 'string';
