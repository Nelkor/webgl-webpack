import { gl } from './canvas'

const getTypeAndNames = str => {
  const [type, ...rem] = str.split(/\s+/i).slice(1)

  const names = rem
    .filter(Boolean)
    .map(name => name.endsWith(',') ? name.slice(0, -1) : name)

  return { type, names }
}

const flatReducer = (acc, { type, names }) => {
  acc.push(...names.map(name => ({ type, name })))

  return acc
}

const createShaderParser = regex => text => (text.match(regex) || [])
  .map(getTypeAndNames)
  .reduce(flatReducer, [])

const parseAttributes = createShaderParser(/attribute ([^;]+)/g)
const parseUniforms = createShaderParser(/uniform ([^;]+)/g)

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
  const addUf = createParsingReducer('getUniformLocation')

  const attrs = parseAttributes(vertexShaderText).reduce(addAttr, {})

  const uniforms = parseUniforms(fragmentShaderText)
    .reduce(addUf, parseUniforms(vertexShaderText).reduce(addUf, {}))

  const getAttr = name => attrs[name]
  const getUniform = name => uniforms[name]

  return {
    use: () => gl.useProgram(program),
    getAttr,
    getUniform,

    // setAttribArrayMode: (name, on = true) => {
    //   const method = on
    //     ? 'enableVertexAttribArray'
    //     : 'disableVertexAttribArray'
    //
    //   gl[method](getAttr(name))
    // },
  }
}
