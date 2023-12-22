import { getOptions } from "./options"

const notices: HTMLDivElement[] = []

export async function createNotice(message: string, type: string) {
  if (!getOptions().showNotices) return

  const notice = document.createElement('div')
  const container = document.querySelector('#notice-container')!
  notice.classList.add('notice')
  notice.classList.add(type)
  notice.textContent = message

  const inst = container.appendChild(notice)
  
  // Wait to ensure its mounted in the DOM
  await new Promise(resolve => setTimeout(resolve, 100))

  // Wow fade in anim!!! what!!!
  inst.classList.add('show')

  notices.push(inst)

  // Remove the notice after 5 seconds
  setTimeout(() => {
    inst.classList.remove('show')
    setTimeout(() => {
      inst.remove()
      notices.splice(notices.indexOf(inst), 1)
    }, 100)
  }, 5000)
}