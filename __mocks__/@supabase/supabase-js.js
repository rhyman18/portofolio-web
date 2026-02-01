const responses = {};
let signedUrl = 'https://signed.example/path';

const chain = (table) => ({
  _table: table,
  select() {
    return this;
  },
  eq() {
    return this;
  },
  order() {
    return this;
  },
  range() {
    return this;
  },
  insert() {
    return {error: null};
  },
  async then(resolve) {
    const res = responses[table] || {};
    return resolve({data: res.data || [], error: res.error, count: res.count});
  },
});

const client = {
  from(table) {
    return chain(table);
  },
  storage: {
    from() {
      return {
        async createSignedUrl() {
          return {data: {signedUrl}, error: null};
        },
      };
    },
  },
};

const createClient = jest.fn(() => client);

createClient.__setResponse = (table, response) => {
  responses[table] = response;
};

createClient.__setSignedUrl = (url) => {
  signedUrl = url;
};

module.exports = {createClient, __esModule: true};
