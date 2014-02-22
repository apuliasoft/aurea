//Global service for global variables
angular.module('aurea.system')
  .factory("Global", [
    function () {
      var _this = this;

      _this._data = {
        user: window.user,
        authenticated: !!window.user
      };

      return _this._data;
    }
  ])

  .factory("SchoolContext", ['School',
    function (School) {
      var schools = [];

      return {
        schools: function(){
          School.query(function (data) {
            angular.copy(data, schools);
            console.log(schools);
          });

          return schools;
        }
      };
    }
  ]);
