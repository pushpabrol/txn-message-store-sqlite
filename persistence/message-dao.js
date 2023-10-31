const { get, all, run } = require('../db')

const createMessage = ({ id, message }) => {
  return run(
    "INSERT INTO messages (id, message, validUntil) values($id, json($message), DATETIME(CURRENT_TIMESTAMP, '+10 minutes', 'localtime'))",
    {
      $id: id,
      $message: message
    }
  )
}

const getMessageById = ({ id }) => {
  return get(`SELECT json(message) as msg , validUntil FROM messages WHERE id = $id`, { $id: id }, (row) => {
    if (!row) return
    return row;
  })
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



module.exports = { getMessageById, createMessage, cleanup }
