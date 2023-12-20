export async function loadSubmissions() {
  const resp = await fetch('/station_list.json')
  const json = await resp.json() as Submissions

  Object.entries(json).forEach(([key, value]) => {
    const elm = document.createElement('a')
    elm.classList.add('submission-row')
    elm.href = `?id=${value.playlist_id}&name=${key}`
    elm.target = '_blank'

    const title = document.createElement('div')
    title.classList.add('submission-cell')
    title.textContent = key

    const submittedBy = document.createElement('div')
    submittedBy.classList.add('submission-cell')
    submittedBy.textContent = value.submitted_by

    elm.appendChild(title)
    elm.appendChild(submittedBy)

    const submissions = document.querySelector('.submission-body')!
    submissions.appendChild(elm)
  })
} 