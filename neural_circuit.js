/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */

const Neural_Layer = require("./neural_layer");

class Neural_Circuit {
  static __id = 0;

  constructor() {
    this._id = Neural_Circuit.__id++;
    this._neural_layers = [];
  }

  get id() {
    return this._id;
  }

  get neural_layers(){
    return this._neural_layers;
  }

  add_neural_layer(){
    this._neural_layers.push(new Neural_Layer())
  }
}

module.exports = Neural_Circuit;