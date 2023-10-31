const router = require('express').Router()
const Persistence = require('../persistence')


router.put('/message', async (req, res) => {
  try {
    const { id, message } = req.body
    console.log(`Call /api/message with id: ${id}, message: ${message}`)

    if (!id) {
      console.error("ID can not be empty")
      res.sendStatus(400)
      return
    }

    if (!message) {
        console.error("Message can not be empty")
        res.sendStatus(400)
        return
      }
      Persistence.MessageDAO.createMessage({ id: id, message: JSON.stringify(message) })
    res.json({
      "id": id
    })
  } catch (e) {
    console.log('Error on PUT /api/message', e)
    res.sendStatus(500)
  }
})

router.get('/message/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('Get message by Id: ', id)

    const data = await Persistence.MessageDAO.getMessageById({ id });
    console.log(data);
    res.json(JSON.parse(data.msg));
  } catch (e) {
    console.log('Error on GET /api/message', e)
    res.sendStatus(500)
  }
})


router.post('/message/cleanup', async (req, res) => {
    try {
      var deleted = await Persistence.MessageDAO.cleanup();
      console.log(deleted);
      res.json({"Rows cleaned up" : deleted });
    } catch (e) {
      console.log('Error on POST /api/cleanup', e)
      res.sendStatus(500)
    }
  })

module.exports = router
