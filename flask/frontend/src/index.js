import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

ReactDOM.render(<Tetrahedron />, document.getElementById('root'))

function Tetrahedron() {
  const ref = useRef() 

  useEffect(() => {
    document.body.style.margin = '0px';
    const canvas = ref.current
    initScene(canvas)
  }, [ref])

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  }

  const canvasStyle = {
    height: '400px',
    width: '400px',
    outline: 'none',
  }

  return (
    <div style={containerStyle}>
      <canvas ref={ref} style={canvasStyle}></canvas>
    </div>
  )
}

function initScene(canvas) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
  camera.position.set(3*Math.random(), 3*Math.random(), 3*Math.random())
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true })
  const controls = new OrbitControls(camera, canvas)
  controls.addEventListener('change', () => renderer.render(scene, camera))

  renderer.setSize(400, 400)
  renderer.setPixelRatio(window.devicePixelRatio)

  const light = new THREE.DirectionalLight()
  light.position.set(1, 2, 3)
  scene.add(light)

  let vertices = [
    [Math.sqrt(3/4), 0, 0, 1/2],
    [-Math.sqrt(1/12), Math.sqrt(2/3), 0, 1/2],
    [-Math.sqrt(1/12), -Math.sqrt(1/6), Math.sqrt(1/2), 1/2],
    [-Math.sqrt(1/12), -Math.sqrt(1/6), -Math.sqrt(1/2), 1/2]
  ]
  vertices = vertices.map(v => new THREE.Vector3(...v))

  for (let i=0; i<vertices.length-1; i++) {
    for (let j=i+1; j<vertices.length; j++) {
      scene.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([vertices[i], vertices[j]]),
          new THREE.LineBasicMaterial({ color: 'black' })
        )
      )
    }
  }

  renderer.render(scene, camera)
}

