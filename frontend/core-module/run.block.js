runHandler.$inject = ["$rootScope", "$transitions", "$state"];

export default runHandler;

function runHandler($rootScope, $transitions, $state) {
    $transitions.onSuccess({to: "main"}, function() {
        $state.go("car-list");
    });
}