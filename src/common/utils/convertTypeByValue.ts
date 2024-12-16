export default function convertTypeByValue(strValue: string) {
  if (canConvertStringToNumber(strValue)) return Number(strValue);

  if (canConvertStringToBoolean(strValue)) return strValue === 'true';

  if (canConvertStringToNull(strValue)) return null;

  return strValue;
}

function canConvertStringToNumber(value: string) {
  return value !== '' && !isNaN(Number(value));
}

function canConvertStringToBoolean(value: string) {
  return value === 'false' || value === 'true';
}

function canConvertStringToNull(value: string) {
  return value === 'null';
}
