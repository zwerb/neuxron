"use strict"; 

    class Neuron {

       constructor(number) {

           this.number = number;

       }

       /* This function will return the square of the number that the constructor of this class receives.*/

       getNumber(){
       
          return this.number;

       }

    }

    module.exports = Neuron;