async function handleRequest (req, res, methodController, next) {
  try {
    // TODO: Use logger instead of console.log
    console.log(`handleRequest - controllerMethodName[${methodController.name}]`)
    await methodController(req, res, next)
  } catch (ex) {
    // TODO: Use logger instead of console.log
    console.error(`handleRequest - errorMessage[${ex.message}] - errorStackTrace[${ex.stack}]`)
  }
}

module.exports = {
  handleRequest
}
