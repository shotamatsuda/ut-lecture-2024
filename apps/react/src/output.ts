import { format } from 'date-fns'

export function output(message: string): void {
  if (typeof window === 'undefined') {
    return
  }
  let element = document.getElementById('output')
  if (element == null) {
    element = document.createElement('div')
    element.setAttribute('id', 'output')
    document.body.append(element)
  }
  if (element != null) {
    const item = document.createElement('div')
    item.textContent = `${format(new Date(), 'mm:ss.SSS')} ${message}`
    element.append(item)
    element.scrollTo(0, element.scrollHeight)
  }
}
