const fs = require('fs');

module.exports = (modelFile, currentModelName) => {
  // Read schema for GraphQL variables
  const schema = fs.readFileSync(modelFile, 'utf-8');
  let tmp = schema.substr(schema.indexOf(`type ${currentModelName} @model`));
  tmp = tmp.substr(0, tmp.indexOf('}'));
  tmp = tmp.trim().split('\n');
  tmp.shift();

  const types = tmp.map(line => {
    let content = line.trim();
    if (['id', 'createdAt', 'updatedAt'].some(w => content.indexOf(w) !== -1)) {
      return '';
    }

    if (content) {
      const match = content.match(/(\w+)\s*:\s+(\[?(\w+)\!?\]?)\!?\s+@relation/);

      // Replace relation syntax with its correct name
      // 'rates: [Rate!]! @relation....' => '$rates: [CountryratesRate!]'
      if (match) {
        const variableName = match[1];
        const variableModel = match[2];
        const linkedModel = match[3];
        const newValue =  `${currentModelName}${variableName}${linkedModel}`;
        content = `${variableName}: ${variableModel.replace(linkedModel, newValue)}`
      }

      content = '$' + content;

      let atIndex = content.indexOf('@');
      atIndex = atIndex === -1 ? undefined : atIndex;
      if (atIndex !== 1) {
        content = content.substr(0, atIndex);
      }
    }

    return content;
  }).join('\n');

  return types;
};
