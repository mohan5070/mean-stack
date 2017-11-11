angular.module('app').controller("mvCourseDetailCtrl", function($scope,mvCourse, $routeParams) {
    // Cached Data
    // mvCachedCourses.query().$promise.then(function(collection) {
    //     collection.forEach(function(course) {
    //        if(course._id === $routeParams.id) {
    //            $scope.course = course;
    //        }
    //    })
    // });

    $scope.course = mvCourse.get({id:$routeParams.id},function(course, whatever) {
        $scope.course = course;
        console.log(course);
        console.log(whatever);
      });

})