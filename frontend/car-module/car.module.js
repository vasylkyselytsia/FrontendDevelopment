import angular from "angular";
import CarService from "./services/car.service";
import carComponent from "./car-component/car-component";

const name = "car";

angular
    .module(name, [])
    .service("CarService", CarService)
    .component("carDescription", carComponent);

export default name;
