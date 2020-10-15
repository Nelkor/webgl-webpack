attribute vec2 a_Position;
attribute vec3 a_Color;

varying vec3 v_FragColor;

void main()
{
  v_FragColor = a_Color;

  gl_Position = vec4(a_Position, 0.0, 1.0);
}
