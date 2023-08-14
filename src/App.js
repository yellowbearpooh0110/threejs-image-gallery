import { Environment, Image, MeshReflectorMaterial, Text, useCursor } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import getUuid from 'uuid-by-string'
import { useLocation, useRoute } from 'wouter'

const GOLDENRATIO = 1.61803398875

export const App = ({ images }) => (
  <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
    <color attach="background" args={['#191920']} />
    <fog attach="fog" args={['#191920', 0, 15]} />
    <group position={[0, -0.5, 0]}>
      <Frames images={images} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </group>
    <Environment preset="city" />
  </Canvas>
)

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name)
      }}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ height, width, url, name, c = new THREE.Color(), ...props }) {
  const image = useRef()
  const frame = useRef()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const uuid = getUuid(url)
  const isActive = params?.id === uuid
  useCursor(hovered)
  useFrame((state, dt) => {
    image.current.material.zoom = 1.1 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) * 0.1
    // easing.damp3(image.current.scale, [1 * (!isActive && hovered ? 0.9 : 1), (599 / 757) * (!isActive && hovered ? 0.9 : 1), 1], 0.1, dt)
    easing.dampC(frame.current.material.color, hovered ? '#00bcd4' : '#673ab7', 0.1, dt)
  })
  return (
    <group {...props}>
      {/* <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[757 / 599, 1, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.9, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} url={url} scale={[599 / 757, 1, 0.05]} position={[0, 0, 0.7]} />
      </mesh> */}
      <Image
        // raycast={() => null}
        name={uuid}
        ref={image}
        onPointerOver={(e) => {
          e.stopPropagation()
          hover(true)
        }}
        onPointerOut={() => {
          hover(false)
        }}
        url={url}
        scale={[width / height, 1, 0.05]}
        position={[0, 0.75, 0.3]}>
        <mesh ref={frame} raycast={() => null} scale={[1.05, 1.05, 0.01]} position={[0, 0, -0.02]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
      </Image>
      <Text maxWidth={2} anchorX="center" anchorY="top" position={[0, 1.4, 0.3]} fontSize={0.1} color="#673ab7">
        {name}
      </Text>
    </group>
  )
}
