CarService.$inject = ['$http'];

export default CarService;

function CarService($http) {
    this.list = async (answer_format="short") => {
        const response = await $http.get(`/api/cars/?answer_format=${answer_format}`);
        return response.data || {};
    }
}