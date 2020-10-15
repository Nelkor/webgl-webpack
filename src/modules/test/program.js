import { gl } from './canvas'

import vShaderText from './vertex.glsl'
import fShaderText from './fragment.glsl'

const compileShader = shader => {
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader))
  }
}

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(vertexShader, vShaderText)
gl.shaderSource(fragmentShader, fShaderText)

compileShader(vertexShader)
compileShader(fragmentShader)

export const program = gl.createProgram()

gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

gl.linkProgram(program)

gl.validateProgram(program)

if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
  throw new Error(gl.getProgramInfoLog(program))
}
