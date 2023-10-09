var Aparelhos = [];

function VisualizarCadastro() {
    document.getElementById("Cadastro").style.display = "block";
}

function Cadastrar() {
    var form = document.getElementById("AparelhoForm");
    var Nome = form.Nome.value;
    var Marca = form.Marca.value;
    var Modelo = form.Modelo.value;
    var Tipo = form.Tipo.value;
    var Condicao = document.querySelector('input[name="Condicao"]:checked').value;
    var Quantidade = parseInt(form.Quantidade.value);
    var Diferenciais = document.querySelector('input[name="Diferenciais"]:checked').value;

    var Diferenciais = [];
    var checkboxes = document.getElementsByName("Diferenciais");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            Diferenciais.push(checkboxes[i].value);
        }
    }
    if (Nome && Marca && Modelo && Tipo && Condicao && Quantidade> 0 && Diferenciais.length > 0) {
        for (var i = 0; i < Quantidade; i++) {
            var Aparelho = {
                Nome: Nome,
                Marca: Marca,
                Modelo: Modelo,
                Tipo: Tipo,
                Condicao: Condicao,
                Quantidade: Quantidade,
                Diferenciais: Diferenciais,
                Ligar: function() {
                    return "O " + this.Nome + " está ligado.";
                },
                Desligar: function(){
                    return "O " + this.Nome + " está desligado.";
                },
                AumentarVolume: function() {
                    return "O volume do " + this.Nome + " foi aumentado.";
                },
            };

            Aparelhos.push(Aparelho);
        }

        form.reset();

        document.getElementById("Cadastro").style.display = "none";
        AtualizarTabela();
    }
    else
    {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}
function Remover(index) {
    if (confirm("Tem certeza que deseja remover este aparelho?")) {
        Aparelhos.splice(index, 1);
        AtualizarTabela();
    }
}
function Editar(index) {
    if (confirm("Tem certeza que deseja editar este aparelho?")) {
        Aparelhos.entries(index, Number);
        AtualizarTabela();
    }
}
function ExecutarAcao(Acao, index) {
    var Aparelho = Aparelhos[index];
    var Mensagem = Aparelho[Acao]();

    alert(Mensagem);
}
function AtualizarTabela() {
    var table = document.getElementById("AparelhoTable");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    for (var i = 0; i < Aparelhos.length; i++) {
        var Aparelho = Aparelhos[i];

        var row = table.insertRow(-1);
        var NomeCell = row.insertCell(0);
        var MarcaCell = row.insertCell(1);
        var ModeloCell = row.insertCell(2);
        var TipoCell = row.insertCell(3);
        var CondicaoCell = row.insertCell(4);
        var QuantidadeCell = row.insertCell(5);
        var DiferenciaisCell = row.insertCell(6);
        var AcoesCell = row.insertCell(7);

        NomeCell.innerHTML = Aparelho.Nome;
        MarcaCell.innerHTML = Aparelho.Marca;
        ModeloCell.innerHTML = Aparelho.Modelo;
        TipoCell.innerHTML = Aparelho.Tipo;
        CondicaoCell.innerHTML = Aparelho.Condicao;
        QuantidadeCell.innerHTML = Aparelho.Quantidade;
        DiferenciaisCell.innerHTML = Aparelho.Diferenciais;

        

        
        var AcoesHTML = `<button onclick="ExecutarAcao('Ligar', ${i})">Ligar</button> `;
        AcoesHTML += `<button onclick="ExecutarAcao('Desligar', ${i})">Desligar</button> `;
        AcoesHTML += `<button onclick="ExecutarAcao('AumentarVolume', ${i})">Aumentar Volume</button>`;
        AcoesCell.innerHTML = AcoesHTML;


        var EditarButton = document.createElement("button");
        EditarButton.innerText = "Editar";
        EditarButton.addEventListener("click", function(){
            Editar(i);
        });
        row.insertCell().appendChild(EditarButton);

        var RemoverButton = document.createElement("button");
        RemoverButton.innerText = "Remover";
        RemoverButton.addEventListener("click", function(){
            Remover(i);
        });
        row.insertCell().appendChild(RemoverButton);
    }
    
}