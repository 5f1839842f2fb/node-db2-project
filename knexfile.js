module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car-dealers.db3'
    },
    useNullAsDefault: true
  }
};
