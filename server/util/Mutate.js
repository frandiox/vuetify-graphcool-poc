const fs = require('fs');
const readline = require('readline');
const path = require('path');
const request = require('request-promise');
const ApolloClient = require('apollo-client').ApolloClient;
const fetch = require('node-fetch');
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
const gql = require('graphql-tag');


// Setup Apollo
const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjcylf0gj013u0155t10i9hws',
  fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Generic mutation
const mutate = (name, data, types, delay) => {
  return new Promise(resolve => {
    const generateParams = () => {
      return Object.keys(data).map(key => {
        const value = data[key];

        return `${key}: $${key}`; // Use GraphQL variables for null values
      }).join('\n');
    };

    setTimeout(() => {
      resolve(client.mutate({
        mutation: gql`
          mutation (
            ${types}
          ) {
            create${name}(
              ${generateParams()}
            ) {
                id
            }
          }
        `,
        variables: data,
      }));
    }, delay);
  });
};

module.exports = (model, items, types, delay) => {
  console.log(`> Populating ${model}`);
  console.log('> Performing', items.length, `mutations with ${delay/1000} seconds delay between each request. This may take time...`)
  const init = Date.now();
  const printTime = () => {
    console.log('> Time:', (Date.now() - init) / 1000, 'seconds.');
  };

  let completed = 0;
  process.stdout.write('0%...');

  return Promise
    .all(
      items.map(
        item => mutate(model, item, types, delay)
          .then(() => {
            completed++;
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`${Math.floor((completed / items.length) * 100)}%`);
          })
      )
    )
    .then(() => {
      console.log('\n\n> Completed!');
      printTime();
    })
    .catch((e) => {
      console.error('\n\n> Something went wrong');
      console.error(e);
      printTime();
    })
  ;
};
