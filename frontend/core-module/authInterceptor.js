authInterceptor.$inject = ["$location", "$q", "$window"];
export default authInterceptor;

function authInterceptor($location, $q, $window) {
    const TOKEN = "b20c55fd4a97267bfc0a1ad2c045e5a8e6c6739f";
    return {
        request: function (config) {
            config.headers = config.headers || {};
            config.headers.Authorization = `TOKEN ${TOKEN}`;
            return config;
        }
    };
}
