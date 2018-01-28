const fs = require('fs');
const path = require('path');

const fileName = process.argv[2];
const typeName = process.argv[3];
const delim = process.argv[4] || ',';

const file = path.resolve(fileName);
const csv = fs.readFileSync(fileName, 'utf-8');

const data = csv.trim().split('\n');
const fields = data.shift().split(delim);
const obj = {
  valueType: 'nodes',
  values: [],
};

data.forEach(line => {
  const values = line.split(delim);
  const tmp = {
    _typeName: typeName,
  };

  fields.forEach((field, index) => {
    tmp[field] = /null/i.test(values[index])
      ? null
      : values[index];
  });

  obj.values.push(tmp);
});

const json = JSON.stringify(obj, null, 2);
output = path.parse(file);
fs.writeFileSync(output.dir + path.sep + output.name + '.json', json);
