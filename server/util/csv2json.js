const fs = require('fs');
const path = require('path');

const fileName = process.argv[2];
const typeName = process.argv[3];
const delim = process.argv[4] || ',';

const file = path.resolve(fileName);
const csv = fs.readFileSync(fileName, 'utf-8');

const data = csv.trim().split('\n');
const fields = data.shift().split(delim);
const result = [];
data.forEach(line => {
  const values = line.split(delim);
  const tmp = { };

  fields.forEach((field, index) => {
    let value = values[index];
    if (/^null$/i.test(value)) {
      value = null;
    } else if (!isNaN(Number(value))) {
      value = Number(value);
    }
    tmp[field] = value;
  });

  result.push(tmp);
});

const json = JSON.stringify(result, null, 2);
output = path.parse(file);
fs.writeFileSync(output.dir + path.sep + output.name + '.json', json);
