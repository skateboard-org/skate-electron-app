const executeScriptBot = async (
  botName: string,
  botParam: string,
  botSource: string
) => {
  let param = botParam;
  if (botParam === undefined || botParam.length === 0) {
    param = 'null';
  }
  return { botName, param };
};

export default executeScriptBot;
