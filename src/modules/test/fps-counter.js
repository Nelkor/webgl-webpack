const fpsTarget = document.querySelector('.fps-target')

let count = 0
let startTime = Date.now()

export const countFrame = () => {
  const now = Date.now()

  if (now - startTime >= 1e3) {
    fpsTarget.innerHTML = count.toString()
    count = 0
    startTime = now
  }

  count++
}
