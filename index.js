import * as AFRAME from 'aframe';
// <script src="https://rawgit.com/google-ar/three.ar.js/f9603ee/dist/three.ar.js"></script>
require('./three.ar.js')
// <script src="https://rawgit.com/chenzlabs/aframe-ar/468a7d9/dist/aframe-ar.min.js"></script>
require('./aframe-ar-min.ar.js')
import * as wasm from './wasm.rs';


AFRAME.registerComponent('animate-scale-wasm', {
    schema: {
        counter: { value : 1, type : "int" },
        timeMult: { value : 0.1, type : "number" }
    },
    tick : function () {
        this.data.counter = wasm.add_one(this.data.counter);
        let s = Math.sin(this.data.counter * this.data.timeMult);
        this.el.setAttribute('scale', `${s} ${s} ${s}`);
        // this.el.object3D.scale.multiplyScalar(Math.sin(this.data.counter * 0.1));
    }
})
