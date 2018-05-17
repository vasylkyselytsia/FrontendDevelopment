import CarDetailController from "../car-module/controllers/car-info.ctrl";
import CarListController from "../car-module/controllers/car-list.ctrl";

coreRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$controllerProvider"];

export default coreRoutes;

function coreRoutes($stateProvider, $urlRouterProvider, $controllerProvider) {
    $urlRouterProvider.otherwise("/cars");
    $stateProvider
        .state("core", {
            abstract: true,
        })
        .state("main", {
            parent: "core",
            url: "/"
        })
        .state("car-list", {
            parent: "main",
            url: "cars",
            views: {
                "car@": {
                    controller: CarListController,
                    controllerAs: 'list',
                    templateProvider: ["$q", $q => {
                        return $q(resolve => {
                            require.ensure([], () => {
                                let template = require("../car-module/templates/car-list.tpl.html");
                                resolve(template);
                            });
                        });
                    }]
                }
            },
            resolve: {
                loadCtrl: ["$q", $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let ctrl = require("../car-module/controllers/car-list.ctrl");
                            $controllerProvider.register("CarListController", ctrl.default);
                            resolve(ctrl);
                        });
                    });
                }]
            }
        })
        .state("car-detail", {
            parent: "car-list",
            url: "/:carId",
            views: {
                "car@": {
                    controller: CarDetailController,
                    controllerAs: 'info',
                    templateProvider: ["$q", $q => {
                        return $q(resolve => {
                            require.ensure([], () => {
                                let template = require("../car-module/templates/car-info.tpl.html");
                                resolve(template);
                            });
                        });
                    }]
                }
            },
            resolve: {
                loadCtrl: ["$q", $q => {
                    return $q(resolve => {
                        require.ensure([], () => {
                            let ctrl = require("../car-module/controllers/car-info.ctrl");
                            $controllerProvider.register("CarDetailController", ctrl.default);
                            resolve(ctrl);
                        });
                    });
                }]
            }
        });
}