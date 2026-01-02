function errorHandler(err, req, res, next) {

  // Jika error berasal dari service (custom error)
  if (err.status && err.errors) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    })
  }

  // Jika error standar JS (throw new Error)
  if (err instanceof Error) {
    return res.status(500).json({
      message: err.message
    })
  }

  // Fallback
  return res.status(500).json({
    message: 'Terjadi kesalahan pada server'
  })
}

module.exports = errorHandler
