const canvas = document.querySelector('#gl-hf')

export const gl = canvas.getContext('webgl')

export let aspectRatio = 1

if (!gl) {
  throw new Error('Can not get webgl context')
}

gl.clearColor(0, 0, 0, 0)

const resize = () => {
  const [width, height] = [
    Math.min(2498, canvas.clientWidth),
    Math.min(1369, canvas.clientHeight),
  ]

  canvas.width = width
  canvas.height = height

  aspectRatio = width / height

  gl.viewport(0, 0, width, height)
}

resize()

window.addEventListener('resize', resize)
