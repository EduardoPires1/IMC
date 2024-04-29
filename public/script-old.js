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

function formatarData(data) {
  data=new Date(data)
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function mostrarHistorico(historico) {
    const historicoDiv = document.querySelector('.historico');
    historicoDiv.innerHTML = '';

    historico.forEach((teste, index) => {
        const p = document.createElement('p');
        const dataFormatada = formatarData(teste.data);
        const classificacao = classificacaoIMC(teste.imc);
        p.textContent = `Nome: ${teste.nome}, Data do teste: ${dataFormatada}, Peso: ${teste.peso} kg, Altura: ${teste.altura} cm, IMC: ${teste.imc.toFixed(2)}, Classificação: ${classificacao}`;
        
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => deleteTask(teste.id));
        p.appendChild(btnExcluir);

        historicoDiv.appendChild(p);
    });
}

let id = 0;

function enviarTeste() {
    const inputPeso = parseFloat(document.querySelector('.inputPeso').value);
    const inputAltura = parseFloat(document.querySelector('.inputAltura').value);
    const dataTeste = new Date();
    const inputNome = document.querySelector('.inputName').value;

    const imc = calcularIMC(inputPeso, inputAltura);

    id = id + 1;
    
    createTask(inputNome, inputPeso, inputAltura, imc, dataTeste)
    mostrarHistorico();
}


function deleteTask(id) {
  console.log("Tentando excluir o item com o ID:", id);
  fetch(`http://localhost:4545/api/users/${id}`, { method: 'DELETE' })
    .then(response => {
      if (response.ok) {
        console.log("Item excluído com sucesso do banco de dados.");
        getAllTasks();
      } else {
        console.error("Falha ao excluir o item do banco de dados.");
      }
    })
    .catch(error => {
      console.error("Erro ao excluir o item:", error);
    });
}

function createTask(nome, peso, altura, imc, data) {
    fetch('http://localhost:4545/api/users/', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, peso, altura, imc, data })
    })
      .then(() => {
        getAllTasks()
      })
}

function updateTask(id, nome, peso, altura, imc, data) {
    fetch('http://localhost:4545/api/users/' + id, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, peso, altura, imc, data })
    })
      .then(() => {
        getAllTasks()
      })
}

const url = './'

function mountTask() {
    enviarTeste()
}

function getAllTasks() {
    fetch('http://localhost:4545/api/users')
      .then((response) => response.json())
      .then(data => mostrarHistorico(data))
}
getAllTasks();