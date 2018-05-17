CarDetailController.$inject = ["$stateParams", "$timeout", "CarService"];
export default CarDetailController;

function CarDetailController($stateParams, $timeout, CarService) {
    const vm = this, {carId} = $stateParams;
    vm.carId = carId;
    vm.showContent = false;
    vm.carDetail = {};

    async function activate() {
        vm.carDetail = await CarService.getOne(vm.carId);
    }

    activate().then(() => $timeout(() => vm.showContent = true))
}