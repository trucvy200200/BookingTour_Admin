import crypto from 'crypto-browserify';
const algorithm = "aes-256-ctr"
const secretKey = "4eve6sdmpNWjRRIqCc7rdxs01lwaking"

export const encrypt = (text) => {
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData
}

export const decrypt = (iv, content) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, "hex"))

  let decryptedData = decipher.update(content, "hex", "utf-8");

  decryptedData += decipher.final("utf8");

  return decryptedData
}

export const parseHexString = (str) => {
  const result = []
  while (str.length >= 2) {
    result.push(parseInt(str.substring(0, 2), 16))
    str = str.substring(2, str.length)
  }

  return result
}
