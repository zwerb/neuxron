/* Test Specs */

const Neural_Circuit = require("./src/neural_circuit");

console.log("Test Specs:");

const neural_circuit = new Neural_Circuit();
neural_circuit.add_neural_layers_of_size(40,400);
neural_circuit.connect_all_layers();
neural_circuit.set_all_layers_random_weights();
neural_circuit.seed_circuit(0.025);
neural_circuit.step_circuit_linear(true);
neural_circuit.display_layer_firing_grids();


