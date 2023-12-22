/*!
Snowflakes
Copyright (c) 2023 by Wakana Y.K. (https://codepen.io/wakana-k/pen/YzBmjea)
*/
import * as THREE from "three";

import { OrbitControls as e } from "three/addons/controls/OrbitControls.js";

import { RGBELoader as t } from "three/addons/loaders/RGBELoader.js";

import { SVGLoader as n } from "three/addons/loaders/SVGLoader.js";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

let o = await new t().loadAsync(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/blouberg_sunrise_2_1k.hdr"
);

(o.mapping = THREE.EquirectangularReflectionMapping),
  (function () {
    function t() {
      const e = window.innerWidth,
        t = window.innerHeight;
      (r.aspect = e / t), r.updateProjectionMatrix(), d.setSize(e, t), a();
    }
    function i() {
      requestAnimationFrame(i), l.update(), a();
    }
    function a() {
      p &&
        (function (e) {
          const t = f.getDelta();
          for (let n = 0; n < e.count; n++) {
            let o = (n % 7) + 1;
            e.getMatrixAt(n, x),
              x.decompose(M.position, M.quaternion, M.scale),
              (M.position.y -= t * h * o),
              M.position.y < -E
                ? ((M.position.y = E),
                  (M.position.x = THREE.MathUtils.randFloat(-E, E)),
                  (M.position.z = THREE.MathUtils.randFloat(-E, E)))
                : n % 4 == 1
                ? ((M.position.x += t * w * o), (M.position.z += t * R * o))
                : n % 4 == 2
                ? ((M.position.x += t * w * o), (M.position.z -= t * R * o))
                : n % 4 == 3
                ? ((M.position.x -= t * w * o), (M.position.z += t * R * o))
                : ((M.position.x -= t * w * o), (M.position.z -= t * R * o)),
              (M.rotation.x += (t + m * o) / 78),
              (M.rotation.z += (t + u * o) / 78),
              M.updateMatrix(),
              e.setMatrixAt(n, M.matrix);
          }
          e.instanceMatrix.needsUpdate = !0;
        })(p),
        d.render(s, r);
    }
    let r,
      s,
      d,
      l,
      c,
      p,
      E = 20;
    const m = 0.7,
      u = 0.3,
      h = 0.2,
      w = 0.1,
      R = 0.1,
      M = new THREE.Object3D(),
      f = new THREE.Clock(),
      H = new THREE.Vector3(),
      x = new THREE.Matrix4();
    let T = new THREE.Vector3(),
      b = new THREE.Euler(),
      g = new THREE.Quaternion();
    const v = new THREE.Vector3(1, 1, 1);
    !(function () {
      const a = document.createElement("div");
      document.body.appendChild(a),
        (s = new THREE.Scene()),
        (d = new THREE.WebGLRenderer({
          antialias: !0,
          alpha: !0,
        })).setPixelRatio(window.devicePixelRatio),
        d.setSize(window.innerWidth, window.innerHeight),
        a.appendChild(d.domElement),
        (r = new THREE.PerspectiveCamera(
          35,
          window.innerWidth / window.innerHeight,
          0.01,
          500
        )).position.set(0, 0, 15),
        r.lookAt(0, 0, 0),
        (c = new THREE.MeshBasicMaterial({
          color: "snow",
          reflectivity: 1,
          envMap: o,
        })),
        (function () {
          const e = document.querySelector("svg#snowflake").outerHTML,
            t = new n().parse(e).paths[0],
            o = n.createShapes(t)[0];
          let i = new THREE.ExtrudeGeometry(o, {
            steps: 1,
            depth: 10,
            bevelEnabled: !0,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: -3,
            bevelSegments: 0,
          });
          i.scale(0.002, 0.002, 0.002),
            i.center(),
            i.deleteAttribute("normal"),
            i.deleteAttribute("uv"),
            ((i =
              BufferGeometryUtils.mergeVertices(
                i
              )).attributes.position.needsUpdate = !0),
            i.computeBoundingBox(),
            i.computeVertexNormals(),
            (p = new THREE.InstancedMesh(i, c, 1e3)),
            g.set(0, 0, 0, 0),
            v.set(1, 1, 1);
          for (let e = 0; e < 1e3; e++)
            H.set(
              THREE.MathUtils.randFloat(-E, E),
              THREE.MathUtils.randFloat(-E, E),
              THREE.MathUtils.randFloat(-E, E)
            ),
              (T = H),
              b.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              ),
              g.setFromEuler(b),
              (v.x = v.y = v.z = 0.7 * Math.random() + 0.3),
              x.compose(T, g, v),
              p.setMatrixAt(e, x);
          s.add(p);
        })(),
        ((l = new e(r, d.domElement)).autoRotate = !0),
        (l.autoRotateSpeed = 1),
        (l.enableDamping = !0),
        (l.enablePan = !1),
        (l.minDistance = 3),
        (l.maxDistance = 30),
        (l.minPolarAngle = 0),
        (l.maxPolarAngle = Math.PI / 2),
        l.target.set(0, 0, 0),
        l.update(),
        i(),
        window.addEventListener("resize", t);
    })();
  })();
