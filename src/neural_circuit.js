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

const getRandomIntBetween = (x, y) => {
  return Math.floor(Math.random() * (y - x + 1) + x);
};

const getRandomArrayOfLengthBetween = (x, y, length) => {
  return Array.from({ length: length }, () => getRandomIntBetween(x, y));
};

const removeValueFromArray = (arr, x) => {
  return arr.filter((val) => val != x);
};

const Neural_Layer = require("./neural_layer");

class Neural_Circuit {
  static __id = 0;

  constructor() {
    this._id = Neural_Circuit.__id++;
    this._neural_layers = [];
    this._epoch = 0;
  }

  get id() {
    return this._id;
  }

  get neural_layers() {
    return this._neural_layers;
  }

  get epoch() {
    return this._epoch;
  }

  increment_epoch() {
    this._epoch++;
  }

  add_neural_layer(neural_layer = null) {
    let new_neural_layer =
      neural_layer == null ? new Neural_Layer() : neural_layer;
    this._neural_layers.push(new_neural_layer);
    return new_neural_layer;
  }

  add_neural_layers(num_layers) {
    let new_layers = [];
    for (let step = 0; step < num_layers; step++) {
      new_layers.push(this.add_neural_layer());
    }
    return new_layers;
  }

  add_neural_layers_of_size(num_layers, size) {
    let new_layers = [];
    for (let step = 0; step < num_layers; step++) {
      new_layers.push(this.add_neural_layer_of_size(size));
    }
    return new_layers;
  }

  add_neural_layer_of_size(size) {
    let new_neural_layer = this.add_neural_layer();
    new_neural_layer = new_neural_layer.add_neurons(size);
    return new_neural_layer;
  }

  connect_layer_A_to_B = (layerA, layerB, max_connections_factor = 1) => {
    let layerA_length = layerA.neurons.length;
    let layerB_length = layerB.neurons.length;
    let num_max_connections = layerA_length * max_connections_factor;

    layerA.neurons.forEach((neuron, index) => {
      // create a random index map of connections
      let connections_array = getRandomArrayOfLengthBetween(
        0,
        layerB_length - 1,
        getRandomIntBetween(0, num_max_connections)
      );
      connections_array.forEach((connection_id) => {
        neuron.add_connection(layerB.neurons[connection_id]);
      });
    });
  };

  // these are all options that don't do anything now, but they will
  // order = linear (connect each layer in array-index order, 0 to len-1)
  // style = random (make the connections random)
  // max_connections_factor = 1 (the maximum number of connections neuron can have as a factor of the size of the layer)
  // overlapping = "yes" (a neuron can be connected to another neuron multiple times)
  connect_all_layers(
    max_connections_factor = 1,
    order = "linear",
    style = "random",
    overlapping = "yes"
  ) {
    let run_times = this.neural_layers.length - 1;

    this.neural_layers.forEach((neural_layer, index) => {
      if (index < run_times) {
        this.connect_layer_A_to_B(
          this.neural_layers[index],
          this.neural_layers[index + 1],
          max_connections_factor
        );
      }
    });
  }

  connect_tail_to_head(
    max_connections_factor = 1,
    order = "linear",
    style = "random",
    overlapping = "yes"
  ) {
    this.connect_layer_A_to_B(
      this.neural_layers[this.neural_layers.length - 1],
      this.neural_layers[0],
      max_connections_factor
    );
  }

  set_all_layers_random_weights(min_weight, max_weight) {
    this.neural_layers.forEach((neural_layer) => {
      neural_layer.set_all_dendrite_random_weights(min_weight, max_weight);
    });
  }

  seed_circuit(seed_factor = 0.2, index = 0) {
    this.neural_layers[index].seed_layer(seed_factor);
  }

  step_circuit_linear(isSeed = false) {
    this.neural_layers.forEach((neural_layer, index) => {
      if (isSeed && index == 0) {
        //
      } else {
        neural_layer.step_linear();
      }
    });
    this.increment_epoch();
  }

  step_circuit_linear_times(num_times = 1, isSeed = false) {
    for (let step = 0; step < num_times; step++) {
      this.neural_layers.forEach((neural_layer, index) => {
        if (isSeed && index == 0) {
          //
        } else {
          neural_layer.step_linear();
        }
      });
      this.increment_epoch();
    }
  }

  get_layer_firing_grids() {
    let layer_firing_grids = [];
    this.neural_layers.forEach((neural_layer) => {
      layer_firing_grids.push(neural_layer.get_layer_firing_grid());
    });
    return layer_firing_grids;
  }

  get_layer_property_grids(property) {
    let layer_property_grids = [];
    this.neural_layers.forEach((neural_layer) => {
      layer_property_grids.push(neural_layer.get_layer_property_grid(property));
    });
    return layer_property_grids;
  }

  display_layer_property_grids(property) {
    let divider = "-----!----#----$-----";
    this.get_layer_property_grids(property).forEach((grid, index) => {
      let display_divider = divider.replace("!", `Epoch: ${this.epoch}`).replace("#", `Layer: ${index}`);
      console.log(display_divider);
      grid.forEach((row) => {
        console.log(row.join("|"));
      });
    });
  }

  display_layer_firing_grids() {
    let divider = "-----!----#----$-----";
    this.get_layer_firing_grids().forEach((grid, index) => {
      let display_divider = divider.replace("!", `Epoch: ${this.epoch}`).replace("#", `Layer: ${index}`);
      console.log(display_divider);
      grid.forEach((row) => {
        console.log(row.join("-"));
      });
    });
  }
}

// module.exports = Neural_Circuit;

// Determine whether we're running client side or server side, if server side, execute module.exports = Neuron;
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
    module.exports = Neural_Circuit;
    root._ = _;
    isNode = true;
  } else {
    root._ = _;
  }
})();
