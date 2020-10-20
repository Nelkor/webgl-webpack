import { createProgram } from '@test/glhf-program'

import vShaderText from './vertex.glsl'
import fShaderText from './fragment.glsl'

export const program = createProgram(vShaderText, fShaderText)
