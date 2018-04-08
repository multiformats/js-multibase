function leftpad (input, pad, length) {
  while (input.length < length) {
    input = pad + input
  }

  return input
}

module.exports = function base2 (alphabet) {
  return {
    encode (input) {
      input = input.toString()

      let output = ''
      for (let i = 0; i < input.length; i++) {
        output += leftpad(input.charCodeAt(i).toString(2), '0', 8)
      }

      return output
    },
    decode (input) {
      for (let char of input) {
        if (alphabet.indexOf(char) < 0) {
          throw new Error('invalid base2 character')
        }
      }

      const charChunks = input.match(new RegExp('.{1,8}', 'g')) || []
      const charCodes = charChunks.map(group => parseInt(group, 2))

      return Buffer.from(charCodes)
    }
  }
}
