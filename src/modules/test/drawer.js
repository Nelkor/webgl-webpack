import { gl } from './canvas'
import { program } from './program'
import { getFigure } from './figure'
import { countFrame } from '@test/fps-counter'

gl.useProgram(program)

const attribPos = gl.getAttribLocation(program, 'a_Position')
const attribColor = gl.getAttribLocation(program, 'a_Color')

export const draw = () => {
  countFrame()
  requestAnimationFrame(draw)

  gl.clear(gl.COLOR_BUFFER_BIT)

  const vertices = new Float32Array(getFigure())
  const buffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  gl.enableVertexAttribArray(attribPos)
  gl.enableVertexAttribArray(attribColor)

  gl.vertexAttribPointer(
    attribPos,
    2,
    gl.FLOAT,
    false,
    Float32Array.BYTES_PER_ELEMENT * 5,
    0,
  )

  gl.vertexAttribPointer(
    attribColor,
    3,
    gl.FLOAT,
    false,
    Float32Array.BYTES_PER_ELEMENT * 5,
    Float32Array.BYTES_PER_ELEMENT * 2,
  )

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)
}

export const startDraw = () => requestAnimationFrame(draw)
