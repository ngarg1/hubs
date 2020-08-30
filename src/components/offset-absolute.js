import { waitForDOMContentLoaded } from "../utils/async-utils";

/**
 * Positions an entity relative to a given target when the given event is fired.
 * @component offset-relative-to
 */
AFRAME.registerComponent("offset-absolute", {
  schema: {
    target: {
      type: "selector"
    },
    offset: {
      type: "vec3"
    },
    on: {
      type: "string"
    },
    orientation: {
      default: 1 // see doc/image_orientations.gif
    },
    selfDestruct: {
      default: false
    },
    lookAt: {
      default: false
    }
  },

  init() {
    this.updateOffset = this.updateOffset.bind(this);

    waitForDOMContentLoaded().then(() => {
      if (this.data.on) {
        this.el.sceneEl.addEventListener(this.data.on, this.updateOffset);
      } else {
        this.updateOffset();
      }
    });
  },

  updateOffset: (function() {
    const y = new THREE.Vector3(0, 1, 0);
    const z = new THREE.Vector3(0, 0, -1);

    let debugVec = new THREE.Vector3();
    return function() {
      const obj = this.el.object3D;
      obj.position.copy(this.data.offset);

      // DEBUG
      obj.getWorldPosition(debugVec);
      console.log("media pos: " + debugVec);

      // NOTE: ROTATION CODE
      // See doc/image_orientations.gif
      switch (this.data.orientation) {
        case 8:
          obj.rotateOnAxis(z, 3 * QUARTER_CIRCLE);
          break;
        case 7:
          obj.rotateOnAxis(z, 3 * QUARTER_CIRCLE);
          obj.rotateOnAxis(y, 2 * QUARTER_CIRCLE);
          break;
        case 6:
          obj.rotateOnAxis(z, QUARTER_CIRCLE);
          break;
        case 5:
          obj.rotateOnAxis(z, QUARTER_CIRCLE);
          obj.rotateOnAxis(y, 2 * QUARTER_CIRCLE);
          break;
        case 4:
          obj.rotateOnAxis(z, 2 * QUARTER_CIRCLE);
          obj.rotateOnAxis(y, 2 * QUARTER_CIRCLE);
          break;
        case 3:
          obj.rotateOnAxis(z, 2 * QUARTER_CIRCLE);
          break;
        case 2:
          obj.rotateOnAxis(y, 2 * QUARTER_CIRCLE);
          break;
        case 1:
        default:
          break;
      }

      obj.matrixNeedsUpdate = true;

      if (this.data.selfDestruct) {
        if (this.data.on) {
          this.el.sceneEl.removeEventListener(this.data.on, this.updateOffset);
        }
        this.el.removeAttribute("offset-absolute");
      }
    };
  })()
});
