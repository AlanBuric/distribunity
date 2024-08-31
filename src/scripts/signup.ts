const lowercaseRegEx = /[a-z]/
const uppercaseRegEx = /[A-Z]/
const numberRegEx = /[0-9]/
const symbolRegEx = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/

const passwordStrengths = ['Weak', 'Moderate', 'Strong', 'Very Strong']
const passwordScale = 4

function isVariedCase(text: string): boolean {
  return lowercaseRegEx.test(text) && uppercaseRegEx.test(text)
}

function measurePasswordStrength(password: string): number {
  return (
    Math.floor(password.length / passwordScale) +
    +isVariedCase(password) +
    +numberRegEx.test(password) +
    +symbolRegEx.test(password)
  )
}

export function getPasswordStrength(password: string) {
  const strength = measurePasswordStrength(password)
  const title = passwordStrengths[Math.min(strength, passwordStrengths.length - 1)]

  return {
    title: title,
    strength: strength
  }
}
