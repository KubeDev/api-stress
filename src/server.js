const express = require('express');
const os = require('os')
const app = express();
const NodeHog = require('nodehog');

stressMaquina = (elemento, tempoStress, intervalo, ciclos) => {

    elementoPraEstressar = ""

    if (elemento === "cpu") {
        elementoPraEstressar = "cpu"
    } else {
        elementoPraEstressar = "memory"
    }
    
    tempoStress = tempoStress * 1000;
    tempoFolga = intervalo * 1000;    
    new NodeHog(elementoPraEstressar, tempoStress, tempoFolga, ciclos).start();
};

app.get('/', (req, res) => {
        
    res.send("OK");
});

app.put('/stress/cpu/tempostress/:tempoStress/intervalo/:intervalo/ciclos/:ciclos', (req, res) => {

    const elemento = "cpu";
    const tempoStress = req.params.tempoStress;
    const tempoFolga = req.params.tempoFolga;
    const ciclos = req.params.ciclos;
    stressMaquina(elemento, tempoStress, tempoFolga, ciclos);
    res.send("OK");
});

app.put('/stress/memoria/tempostress/:tempoStress/intervalo/:intervalo/ciclos/:ciclos', (req, res) => {

    const elemento = "memoria";
    const tempoStress = req.params.tempoStress;
    const tempoFolga = req.params.tempoFolga;
    const ciclos = req.params.ciclos;
    stressMaquina(elemento, tempoStress, tempoFolga, ciclos);
    res.send("OK");
});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
