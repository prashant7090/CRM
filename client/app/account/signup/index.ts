'use strict';
const angular = require('angular');
import SignupController from './signup.controller';

export default angular.module('meanApp.signup', [])
    .controller('SignupController', SignupController)
    .name;
