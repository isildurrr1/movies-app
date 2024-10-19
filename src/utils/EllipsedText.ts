export const ellipsedText = (text: string, numOfGenres: number) => {
  let newText = text
  const minSymbols = 150 // если жанры в 2 строки
  const maxSymbols = 207 // если жанры в 1 строки
  if (numOfGenres > 3) {
    if (text.length > minSymbols) {
      if (/\s/.test(text[minSymbols])) {
        newText = `${text.slice(0, minSymbols)} ...`
      } else {
        newText = `${text.slice(0, minSymbols).split(' ').slice(0, -1).join(' ')} ...`
      }
    }
  } else {
    if (text.length > maxSymbols) {
      if (/\s/.test(text[maxSymbols])) {
        newText = `${text.slice(0, maxSymbols)} ...`
      } else {
        newText = `${text.slice(0, maxSymbols).split(' ').slice(0, -1).join(' ')} ...`
      }
    }
  }
  return newText
}
