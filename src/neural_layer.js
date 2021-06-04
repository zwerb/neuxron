/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */

const Neuron = require("./neuron");

class Neural_Layer {
  static __id = 0;

  constructor() {
    this._id = Neural_Layer.__id++;
    this._neurons = [];
  }

  get id() {
    return this._id;
  }

  get neurons() {
    return this._neurons;
  }

  add_neuron(neuron = null) {
    let new_neuron = neuron == null ? new Neuron() : neuron;
    this._neurons.push(new_neuron);
    return new_neuron;
  }

  add_neurons(num_neurons) {
    let new_neurons = [];
    for (let step = 0; step < num_neurons; step++) {
      new_neurons.push(this.add_neuron());
    }
    return new_neurons;
  }

  set_all_dendrite_random_weights(min_weight, max_weight) {
    this.neurons.forEach((neuron) => {
      neuron.set_random_dendrite_weights(min_weight, max_weight);
    });
  }

  step_linear() {
    this.neurons.forEach((neuron) => neuron.step());
  }

  seed_layer(seed_factor) {
    for (
      let step = 0;
      step < Math.floor(this.neurons.length * seed_factor);
      step++
    ) {
      this.neurons[step].fire();
    }
  }

  get_layer_firing_grid(){
    let grid_length = this.neurons.length;
    let num_cols = Math.ceil(Math.sqrt(grid_length));
    let num_rows = Math.floor(Math.sqrt(grid_length));
    let index = -1;
    return Array.from({ length: num_rows }, () =>
      Array.from({ length: num_cols }, () => {
        index = index + 1;
        return this.neurons[index] ? (this.neurons[index].is_firing ? "X" : " ") : ".";
      })
    );
  };
  
  display_layer_firing_grid = (grid) => {
    this.get_layer_firing_grid().forEach((row) => {
      console.log(row.join("-"));
    });
  };

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
    module.exports = Neural_Layer;
    root._ = _;
    isNode = true;
  } else {
    root._ = _;
  }
})();
