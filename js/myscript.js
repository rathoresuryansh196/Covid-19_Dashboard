const URL = "https://covid19.mathdro.id/api";
const URL1 = "https://api.rootnet.in/covid19-in/contacts"

let app = angular.module("MyApp", []);

app.controller('MyCtrl', ($scope, $http)=>{

    $scope.title = "COVID-19 Dashboard";

    console.log("APP Loaded");
 
    // Calling API

    $http.get(URL).then(
        (response)=>{
            
             console.log(response.data);
             $scope.all_data = response.data
        },
        (error)=> {
            console.log(error);
        }
    );
    
    //get india data
    $http.get(`${URL}/countries/${"india"}`).then(
        (response)=>{
            
             console.log(response.data);
             $scope.india_data = response.data
        },
        (error)=> {
            console.log(error);
        }
    );

    //get country data
    $scope.get_c_data = () => {
        let country=$scope.c;
        if(country == "") {
            $scope.c_data=undefined;
            return;
        }

        $http.get(`${URL}/countries/${country}`)
        .then((response)=>{
            console.log(response.data);
            $scope.c_data = response.data;
        },
        (error)=>{
            console.log(error);
        }
        );
    };

    //get India statewise data
    $scope.get_s_data = () => {
        let state=$scope.s;
        if(state=="")
            $scope.s_data="";
        $http.get(`${URL}/countries/${"india"}/confirmed`).then(
            (response)=>{
                for (i = 0; i < response.data.length; i++) {
                    obj = response.data[i];
                    if(obj.provinceState.toLowerCase() == state.toLowerCase()){
                        $scope.s_data = obj;
                        console.log(obj.provinceState);
                        break;
                    }
                  }
            },
            (error)=> {
                console.log(error);
            }
        );
    };

    //get state wise contact info
    $scope.get_ct_data = () => {
        let st=$scope.ct;
        if(st=="")
            $scope.ct_data="";
        $http.get(`${URL1}`).then(
            (response)=>{
                console.log(response.data.data.contacts.regional);
                for (i = 0; i < response.data.data.contacts.regional.length; i++) {
                    obj1 = response.data.data.contacts.regional[i].loc;
                    //console.log(obj1);
                    if(obj1.toLowerCase() == st.toLowerCase()){
                        $scope.ct_data = response.data.data.contacts.regional[i].number;
                        console.log($scope.ct_data);
                        break;
                    }
                  }
            },
            (error)=> {
                console.log(error);
            }
        );
    };
    //get date of a particular date
    $scope.get_d_data = () => {
        var date = $scope.d;
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        var obj ={};
        obj.confirmed=0;
        obj.recovered=0;
        obj.deaths=0;
        $http.get(`${URL}/daily/${month}-${day-1}-${year}`).then(
            (response)=>{
                for (i = 0; i < response.data.length; i++) {
                    temp = response.data[i];
                    if(temp.countryRegion == "India"){
                        obj.confirmed-=parseInt(temp.confirmed);
                        obj.recovered-=parseInt(temp.recovered);
                        obj.deaths-=parseInt(temp.deaths);
                    }
                  }
            },
            (error)=> {
                console.log(error);
            }
        );
        $http.get(`${URL}/daily/${month}-${day}-${year}`).then(
            (response)=>{
                for (i = 0; i < response.data.length; i++) {
                    temp = response.data[i];
                    if(temp.countryRegion == "India"){
                        obj.confirmed+=parseInt(temp.confirmed);
                        obj.recovered+=parseInt(temp.recovered);
                        obj.deaths+=parseInt(temp.deaths);
                    }
                  }
                  $scope.d_data = obj;
            },
            (error)=> {
                console.log(error);
            }
        );
    }


});


