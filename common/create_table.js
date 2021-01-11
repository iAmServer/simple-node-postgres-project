const createTablesQueries = () => {
  const query = [
    `CREATE TABLE IF NOT EXISTS
    client(
      id SERIAL PRIMARY KEY,
      fname VARCHAR(128) NOT NULL,
      lname VARCHAR(128) NOT NULL,
      phone VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL UNIQUE,
      address TEXT NOT NULL,
      created_date TIMESTAMP,
      modified_date TIMESTAMP
      )`,
    `CREATE TABLE IF NOT EXISTS
    appointment(
      id SERIAL PRIMARY KEY,
      client INT NOT NULL,
      details TEXT NOT NUll,
      medication TEXT,
      date DATE NOT NULL,
      created_date TIMESTAMP,
      modified_date TIMESTAMP,
      FOREIGN KEY (client) REFERENCES client (id) ON DELETE CASCADE
    )`,
    `CREATE TABLE IF NOT EXISTS
    doctor(
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      phone VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL UNIQUE,
      created_date TIMESTAMP,
      modified_date TIMESTAMP
    )`
  ]

  return query
}

module.exports = createTablesQueries
