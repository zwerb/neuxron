/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */

const Neuron = require("./neuron");

class Neural_Circuit {
  static __id = 0;

  constructor() {
    this._id = Neural_Circuit.__id++;
    this._neurons = [];
  }

  get id() {
    return this._id;
  }

  get neurons(){
    return this._neurons;
  }

  add_neuron(){
    this._neurons.push(new Neuron())
  }
}

module.exports = Neural_Circuit;