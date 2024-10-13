export const ellipsedText = (text: string) => {
  let newText = text
  if (text.length > 207) {
    if (/\s/.test(text[207])) {
      newText = `${text.slice(0, 207)} ...`
    } else {
      newText = `${text.slice(0, 207).split(' ').slice(0, -1).join(' ')} ...`
    }
  }
  return newText
}
