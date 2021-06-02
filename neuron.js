/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */

class Neuron {
  static __id = 0;

  constructor() {
    this._id = Neuron.__id++;
  }

  get id() {
    return this._id;
  }
}

module.exports = Neuron;