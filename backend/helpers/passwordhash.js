const bcrypt = require('bcrypt')
const getHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
    const paper = process.env.BCRYPT_PASSWORD
    const hash = await bcrypt.hash(password + paper, salt)
    return hash
  } catch (error) {
    throw Error(`can't hash password error ${error}`)
  }
}
const compareHash = (password, encryptedPassword) => {
  const paper = process.env.BCRYPT_PASSWORD
  const samePass = bcrypt.compareSync(password + paper, encryptedPassword)
  return samePass
}
module.exports = { getHash, compareHash }
