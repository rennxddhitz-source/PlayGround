import * as THREE from 'three';

/* Push a circle (XZ) out of axis-aligned boxes. */
export function resolveCircle(pos, radius, colliders, height = 1.8) {
  for (const b of colliders) {
    if (b.max.y < pos.y + 0.25 || b.min.y > pos.y + height) continue;
    const cx = Math.max(b.min.x, Math.min(pos.x, b.max.x));
    const cz = Math.max(b.min.z, Math.min(pos.z, b.max.z));
    let dx = pos.x - cx;
    let dz = pos.z - cz;
    const d2 = dx * dx + dz * dz;
    if (d2 > radius * radius) continue;
    if (d2 > 1e-8) {
      const d = Math.sqrt(d2);
      pos.x += (dx / d) * (radius - d);
      pos.z += (dz / d) * (radius - d);
    } else {
      const left = pos.x - b.min.x;
      const right = b.max.x - pos.x;
      const back = pos.z - b.min.z;
      const front = b.max.z - pos.z;
      const m = Math.min(left, right, back, front);
      if (m === left) pos.x = b.min.x - radius;
      else if (m === right) pos.x = b.max.x + radius;
      else if (m === back) pos.z = b.min.z - radius;
      else pos.z = b.max.z + radius;
    }
  }
}

const _ray = new THREE.Raycaster();
const _dir = new THREE.Vector3();

export function lineBlocked(from, to, meshes) {
  _dir.subVectors(to, from);
  const dist = _dir.length();
  if (dist < 0.001) return false;
  _dir.multiplyScalar(1 / dist);
  _ray.set(from, _dir);
  _ray.far = dist - 0.05;
  _ray.near = 0.01;
  const hits = _ray.intersectObjects(meshes, false);
  return hits.length > 0;
}

export function randRange(a, b) { return a + Math.random() * (b - a); }
