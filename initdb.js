const { exec } = require('./db')

const initDatabase = async () => {
  await exec(`
  CREATE TABLE IF NOT EXISTS messages  (
    id varchar(255) UNIQUE NOT NULL,
    message TEXT NOT NULL,
    validUntil DATETIME NOT NULL,
    PRIMARY KEY (id)
  )`)

}

module.exports = { initDatabase }
