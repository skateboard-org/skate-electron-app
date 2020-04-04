export const ONLY_BOT_PRESENT = 'ONLY_BOT_PRESENT';
export const BOT_AND_PARAM_PRESENT = 'BOT_AND_PARAM_PRESENT';
export const INVALID_STRING_IN_SKATEBOARD = 'INVALID_STRING_IN_SKATEBOARD';

export function cleanString(str: string) {
  return str.trim().toLowerCase();
}

export function stringAnalysis(str: string) {
  const cleanStr = cleanString(str);
  if (cleanStr === undefined || cleanStr.length === 0) {
    return { result: INVALID_STRING_IN_SKATEBOARD };
  }
  const tokens = cleanStr.split(' ');
  if (cleanStr.startsWith('@')) {
    if (tokens.length === 2) {
      return {
        botString: tokens[0],
        paramString: tokens[1],
        result: BOT_AND_PARAM_PRESENT
      };
    }
    if (tokens.length === 1)
      return {
        paramString: undefined,
        botString: tokens[0],
        result: ONLY_BOT_PRESENT
      };
  }
  return {
    result: INVALID_STRING_IN_SKATEBOARD,
    paramString: undefined,
    botString: undefined
  };
}
