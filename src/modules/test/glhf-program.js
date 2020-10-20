import { gl } from '@test/canvas'

const parseAttrib = attrib => {
  const [type, name] = attrib.split(/\s+/i).slice(1)

  return { type, name }
}

const parseVertexShader = sourceText => sourceText
  .match(/attribute ([^;]+)/g).map(parseAttrib)

const compileShader = shader => {
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader))
  }
}

export const createProgram = (vertexShaderText, fragmentShaderText) => {
  const program = gl.createProgram()
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

  gl.shaderSource(vertexShader, vertexShaderText)
  gl.shaderSource(fragmentShader, fragmentShaderText)

  compileShader(vertexShader)
  compileShader(fragmentShader)

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.validateProgram(program)

  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program))
  }

  const addAttr = (acc, cur) => {
    acc[cur.name] = gl.getAttribLocation(program, cur.name)

    return acc
  }

  const attrs = parseVertexShader(vertexShaderText).reduce(addAttr, {})

  return {
    use: () => gl.useProgram(program),
    getAttr: name => attrs[name],
  }
}
