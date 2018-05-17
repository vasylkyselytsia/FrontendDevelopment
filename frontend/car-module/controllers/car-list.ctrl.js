CarListController.$inject = ["$rootScope", "$timeout", "CarService"];
export default CarListController;

function CarListController($rootScope, $timeout, CarService) {

    const vm = this;
    vm.showContent = false;
    vm.carsList = [];

    const activate = async () => {
        vm.carsList = await CarService.list();
    };

    activate().then(() => $timeout(() => vm.showContent = true));
}