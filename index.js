import * as AFRAME from 'aframe';
// <script src="https://rawgit.com/google-ar/three.ar.js/f9603ee/dist/three.ar.js"></script>
require('./three.ar.js')
// <script src="https://rawgit.com/chenzlabs/aframe-ar/468a7d9/dist/aframe-ar.min.js"></script>
require('./aframe-ar-min.ar.js')
import {add_one} from './add_one.rs';

// Mostly from: https://github.com/google-ar/three.ar.js/blob/a36b9d1ba85a8a11e54622c6d0d29e7c028a636c/src/ARUtils.js
// but with a couple style tweaks (to counter A-Frame + make it transparent)
const LEARN_MORE_LINK = 'https://developers.google.com/ar/develop/web/getting-started';
const UNSUPPORTED_MESSAGE = `This augmented reality experience requires
  WebARonARCore or WebARonARKit, experimental browsers from Google
  for Android and iOS. Learn more at the <a href="${LEARN_MORE_LINK}">Google Developers site</a>.`;

THREE.ARUtils.displayUnsupportedMessage = customMessage => {
  const element = document.createElement('div');
  element.id = 'webgl-error-message';
  element.style.fontFamily = 'monospace';
  element.style.fontSize = '13px';
  element.style.fontWeight = 'normal';
  element.style.textAlign = 'center';
  element.style.background = 'rgba(255, 255, 255, 0.7)';
  element.style.border = '1px solid black';
  element.style.color = '#000';
  element.style.padding = '1.5em';
  element.style.width = '400px';
  element.style.position = 'absolute';
  element.style.top = '0';
  element.style.left = '0';
  element.innerHTML = typeof(customMessage) === 'string' ? customMessage : UNSUPPORTED_MESSAGE;
  document.body.appendChild(element);
};

THREE.ARUtils.getARDisplay().then(function (display) {
  if (!display) {
      console.log("unsupported?");
      THREE.ARUtils.displayUnsupportedMessage()
  }
});


AFRAME.registerComponent('animate-scale-wasm', {
    schema: {
        counter: { value : 1, type : "int" },
        timeMult: { value : 0.1, type : "number" }
    },
    tick : function () {
        this.data.counter = add_one(this.data.counter);
        let s = Math.sin(this.data.counter * this.data.timeMult);
        this.el.setAttribute('scale', `${s} ${s} ${s}`);
        // this.el.object3D.scale.multiplyScalar(Math.sin(this.data.counter * 0.1));
    }
})
