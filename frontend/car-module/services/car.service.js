CarService.$inject = ['$http'];

export default CarService;

function CarService($http) {
    this.list = async (answer_format = "info") => {
        const response = await $http.get(`/api/cars/?answer_format=${answer_format}`);
        return response.data || {};
    };

    this.getOne = async (id) => {
        const response = await $http.get(`/api/cars/${id}/`);
        return response.data || {};
    }
}