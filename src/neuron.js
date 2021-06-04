/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */

 const getRandomFloatBetween = (x, y) => {
  return Math.random() * (y - x) + x;
};

const MIN_WEIGHT = 1.0
const MAX_WEIGHT = -1.0

const Axon_Terminal = require("./axon_terminal");
const Dendrite = require("./dendrite");
const Neural_Layer = require("./neural_layer");

class Neuron {
  static __id = 0;

  constructor() {
    this._id = Neuron.__id++;
    this._dendrites = [];
    this._axon_terminals = [];
    this._potential = 0;
    this._threshold = 1;
    this._is_firing = false;
  }

  get id() {
    return this._id;
  }

  get dendrites() {
    return this._dendrites;
  }

  get axon_terminals() {
    return this._axon_terminals;
  }

  get potential() {
    return this._potential;
  }

  get threshold() {
    return this._threshold;
  }

  get is_firing() {
    return this._is_firing;
  }

  set is_firing(is_firing) {
    this._is_firing = is_firing;
  }

  set potential(potential) {
    this._potential = potential;
  }

  get connection_ids() {
    return this.axon_terminals.map(
      (axon_terminal) => axon_terminal.connected_to.id
    );
  }

  add_dendrite(connected_to = null) {
    let new_dendrite = new Dendrite(this, connected_to);
    this.dendrites.push(new_dendrite);
    return new_dendrite;
  }

  add_axon_terminal(connected_to = null) {
    let new_axon_terminal = new Axon_Terminal(this, connected_to);
    this.axon_terminals.push(new_axon_terminal);
    return new_axon_terminal;
  }

  add_connection(neuron) {
    neuron.add_dendrite(this.add_axon_terminal(neuron));
  }

  set_random_dendrite_weights(min_weight = MIN_WEIGHT, max_weight = MAX_WEIGHT) {
    this.dendrites.forEach((dendrite) => {
      dendrite.weight = getRandomFloatBetween(min_weight, max_weight);
    });
  };

  fire() {
    this.axon_terminals.forEach((axon_terminal) => {
      axon_terminal.fire();
    });
    this.is_firing = true;
  }

  inhibit() {
    this.axon_terminals.forEach((axon_terminal) => {
      axon_terminal.inhibit();
    });
    this.is_firing = false;
  }

  regress() {
    // how do we ramp down
  }

  // calculate an instant / step (add inputs, process, outputs)
  step() {
    let temp_potential = this.dendrites.reduce((accumulator, dendrite) => {
      accumulator = accumulator + dendrite.output;
      return accumulator;
    }, 0);

    this.potential = temp_potential;

    if (this.potential > this.threshold) {
      this.fire();
    } else if (this.is_firing) {
      this.inhibit();
    }

    // need to figure out how to dampen signal after firing
    this.regress();
  }
}

(function () {
  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Create a reference to this
  var _ = new Object();

  var isNode = false;

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Neuron;
    root._ = _;
    isNode = true;
  } else {
    root._ = _;
  }
})();
