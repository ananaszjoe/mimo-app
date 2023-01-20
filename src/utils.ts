
import { ContentBitType, InputType } from './state'

export const insertInput = (content: ContentBitType[], input: InputType | undefined) => {
  if(!input) return content
  
  var result: ContentBitType[] = []
  let currentLength = 0

  content.forEach(piece => {
    var currentText = ''
    
    piece.text && piece.text.split('').forEach(letter => {
      if(currentLength === input.startIndex) {
        if(!!currentText.length) result.push({color: piece.color, text: currentText})
        currentText = ''
        result.push({input: true})
      }
      if(currentLength + 1 <= input.startIndex || currentLength >= input.endIndex) {
        currentText += letter
      }
      currentLength++
    })
    result.push({color: piece.color, text: currentText})
  });
  return result
}