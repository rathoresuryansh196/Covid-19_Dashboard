const URL = "https://api.rootnet.in/covid19-in/notifications";

let app = angular.module("MyApp1", []);

app.Controller('MyCtrl1', ($scope, $http)=>{

    $scope.title = "Notice board"

    console.log("Notice Loaded");
 
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

    //notice blocks
    $scope.get_notice = () =>{
        let notice = scope.n;
        $http.get(`${URL}/title`).then(
            (response)=>{
                for( i=0;i<response.data.length;i++)
                {
                    obj=response.data[i];
                }
            }
        )
    }
});