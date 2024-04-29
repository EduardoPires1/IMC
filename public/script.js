const app = angular.module('imc-app', [])

function calcularIMC(peso, altura) {
    const alturaMetros = altura / 100; 
    return peso / (alturaMetros * alturaMetros);
}

function classificacaoIMC(imc) {
    if (imc < 18.5) {
        return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
        return 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
        return 'Sobrepeso';
    } else {
        return 'Obesidade';
    }
}


app.controller('imc-controller', ($scope, $http)=>{
    $scope.userIMC = ""
    $scope.pesoIMC = ""
    $scope.alturaIMC = ""
    $scope.imc = ""
    $scope.data = ""
    $scope.userList = []

    $scope.addIMC = () => {
        if(!$scope.userIMC) {
            return alert('Digite um nome!')
        }
        $scope.data = new Date()
       $scope.imc = calcularIMC($scope.pesoIMC, $scope.alturaIMC)
       $http.post('http://localhost:4545/api/users', {nome: $scope.userIMC, peso: $scope.pesoIMC, altura: $scope.alturaIMC, imc: $scope.imc, data: $scope.data  })
       .then(() => {
        $scope.loadTaskList()
       }, () => {
            alert("Ocorreu algum erro")
       })
    }
    $scope.loadTaskList = async () => {
        const { data } = await $http.get('http://localhost:4545/api/users');
        console.log(data);
        $scope.userList = data;
        $scope.$apply();
    }

    $scope.loadTaskList();

    $scope.deleteUser = (id) => {
        $http.delete('http://localhost:4545/api/users/' + id)
        .then(() =>{
            $scope.loadTaskList()
        })
    }
})


