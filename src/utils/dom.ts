export function hasClass(el: HTMLElement, className: string): boolean {
  return Boolean(el.className) && el.className.split(' ').includes(className)
}

export function addClass(el: HTMLElement, className: string) {
  if (!hasClass(el, className)) {
    el.className += ' ' + className
  }
}
