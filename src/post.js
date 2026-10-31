import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uDamage: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uDamage;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 d = uv - 0.5;
      float r2 = dot(d, d);

      // subtle lens fringing toward the edges
      vec2 off = d * r2 * 0.014;
      float r = texture2D(tDiffuse, uv + off).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - off).b;
      vec3 col = vec3(r, g, b);

      // filmic grade: cool shadows, warm highlights
      float luma = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(col, col * vec3(0.94, 1.0, 1.06), (1.0 - luma) * 0.35);
      col = mix(col, col * vec3(1.06, 1.0, 0.94), luma * 0.3);
      col = (col - 0.5) * 1.055 + 0.5;
      float l2 = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(l2), col, 1.09);
      col = max(col, 0.0);

      // damage tint
      col = mix(col, vec3(0.35, 0.02, 0.01), uDamage * smoothstep(0.05, 0.75, r2) * 0.7);

      // vignette
      float vig = smoothstep(0.92, 0.22, length(d) * 1.22);
      col *= mix(0.62, 1.0, vig);

      // grain
      float n = hash(uv * vec2(1723.0, 967.0) + fract(uTime) * 91.7);
      col += (n - 0.5) * 0.032;

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

export function createPost(renderer, scene, camera) {
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const target = new THREE.WebGLRenderTarget(size.x, size.y, {
    type: THREE.HalfFloatType,
    samples: 4,
  });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.34, 0.6, 0.92);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const gradePass = new ShaderPass(GradeShader);
  composer.addPass(gradePass);

  function resize() {
    composer.setSize(window.innerWidth, window.innerHeight);
    bloom.setSize(window.innerWidth, window.innerHeight);
  }

  return {
    composer,
    bloom,
    grade: gradePass,
    resize,
    render(dt, time, damage = 0) {
      gradePass.uniforms.uTime.value = time;
      gradePass.uniforms.uDamage.value = damage;
      composer.render(dt);
    },
  };
}
