import angular from "angular";
import uiRouter from "@uirouter/angularjs";
import authInterceptor from "./core-module/authInterceptor";
import routerConfig from "./core-module/core.router";
import runConfig from "./core-module/run.block";
import carModule from "./car-module/car.module";

const app = "app";

angular
    .module(app, [uiRouter, carModule])

    .factory('authInterceptor', authInterceptor)

    .config(['$interpolateProvider', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }])
    .config(["$locationProvider", function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])
    .config(["$locationProvider", function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(routerConfig)
    .run(runConfig);
