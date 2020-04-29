export const ONE_TOKEN_PRESENT = 'ONE_TOKEN_PRESENT';
export const MORE_THAN_ONE_TOKEN_PRESENT = 'MORE_THAN_ONE_TOKEN_PRESENT';
export const INVALID_STRING_IN_SKATEBOARD = 'INVALID_STRING_IN_SKATEBOARD';

export function cleanString(str: string) {
  return str.trim().toLowerCase();
}

interface SkateBoardTextComponents {
  botString: string;
  paramString: string;
  result: string;
}

export function stringAnalysis(str: string): SkateBoardTextComponents {
  const cleanStr = str.toLowerCase();

  if (cleanStr === undefined || cleanStr.length === 0) {
    return {
      result: INVALID_STRING_IN_SKATEBOARD,
      botString: '',
      paramString: ''
    };
  }
  const tokens = cleanStr.split(' ');
  if (cleanStr.startsWith('@')) {
    if (tokens.length === 1) {
      return {
        paramString: '',
        botString: tokens[0],
        result: ONE_TOKEN_PRESENT
      };
    }
    if (tokens.length === 2) {
      return {
        botString: tokens[0],
        paramString: tokens[1],
        result: MORE_THAN_ONE_TOKEN_PRESENT
      };
    }
    if (tokens.length > 2) {
      const botName = tokens[0];
      tokens.shift();
      return {
        paramString: tokens.join(' '),
        botString: botName,
        result: MORE_THAN_ONE_TOKEN_PRESENT
      };
    }
  }
  return {
    result: INVALID_STRING_IN_SKATEBOARD,
    paramString: '',
    botString: ''
  };
}
