export function isPlainObject(value: any): value is object {
  if (getObjectClassLabel(value) !== "[object Object]") {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype.hasOwnProperty("isPrototypeOf");
}

export function getObjectClassLabel(value: any): string {
  return Object.prototype.toString.call(value);
}
