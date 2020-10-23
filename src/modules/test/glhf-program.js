import { gl } from '@test/canvas'

const getTypeAndName = str => {
  const [type, name] = str.split(/\s+/i).slice(1)

  return { type, name }
}

const createShaderParser = regex => text => (text.match(regex) || [])
  .map(getTypeAndName)

const parseVertexShader = createShaderParser(/attribute ([^;]+)/g)
const parseFragmentShader = createShaderParser(/uniform ([^;]+)/g)

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

  const createParsingReducer = method => (acc, cur) => {
    acc[cur.name] = gl[method](program, cur.name)

    return acc
  }

  const addAttr = createParsingReducer('getAttribLocation')
  const addUf = createParsingReducer('getUniform')

  const attrs = parseVertexShader(vertexShaderText).reduce(addAttr, {})
  const uniforms = parseFragmentShader(fragmentShaderText).reduce(addUf, {})

  return {
    use: () => gl.useProgram(program),
    getAttr: name => attrs[name],
    getUniform: name => uniforms[name],
  }
}
