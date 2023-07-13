export const mergeArrays = <
  T1 extends Record<string, any>,
  T2 extends Record<string, any>
>(
  arr1: T1[],
  arr2: T2[],
  key: string
) =>
  Object.values(
    [...arr1, ...arr2].reduce((acc, item) => {
      acc[item[key]] = { ...acc[item[key]], ...item };
      return acc;
    }, {} as (T1 & T2)[])
  );
