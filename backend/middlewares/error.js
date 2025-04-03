const createError = (status, message, details = null) => {
    // Créé une nouvelle instance d'erreur vide
    const error = new Error(message);
    error.status = status
    error.details = details
    return error
}
module.exports = createError;