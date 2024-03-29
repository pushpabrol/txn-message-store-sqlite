const sqlite3 = require('sqlite3')

let db

const connect = (path) => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(path, (err) => {
      if (err) {
        console.error(err.message)
        reject()
      }
      console.log(`Connected to the message store database ${path}`)
      resolve()
    })
  })
}

const get = (sql, params, convert = (row) => row) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err)
      } else {
        resolve(convert(row))
      }
    })
  })
}

const all = (sql, params, convert = (rows) => rows) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(convert(rows))
      }
    })
  })
}

const run = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) {
        console.log(err);
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const exec = (sql) => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (statement, err) => {
      if (err) {
        reject(err)
      } else {
        resolve(statement)
      }
    })
  })
}

const getDb = () => {
  return db
}

const CLEANUP_COMMAND =
  "DELETE FROM messages WHERE validUntil < DATETIME(CURRENT_TIMESTAMP, '-5 seconds', 'localtime')";

  const CHANGES = "SELECT changes()"

const cleanup = async() =>{
    await run(CLEANUP_COMMAND)
    return get(CHANGES, {}, (row) => {
        if (!row) return
        return row;
      })
}

module.exports = { connect, exec, get, all, run, getDb, cleanup }
