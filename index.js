const express = require("express")
const mongoose = require('mongoose');
const app = express()

app.use(express.json())
const port = 3000

const Plantas = mongoose.model('Plantas', {
    imagem: String,
    nome: String,
    luz: String,
    agua: String
})

app.get('/read', async (req, res) => {
    const plantas = await Plantas.find()
    return res.send(plantas)
})

app.delete("/delete/:id", async (req, res) => {
    const plantas = await Plantas.findByIdAndDelete(req.params.id)
    return res.send(plantas)
})

app.put("/update/:id", async (req, res) => {
    const plantas = await Plantas.findByIdAndUpdate(req.params.id, {
        imagem: req.body.imagem,
        nome: req.body.nome,
        luz: req.body.luz,
        agua: req.body.agua
    })
    return res.send(plantas)

})

app.post("/create", async (req, res) => {

    try {
        const plantas = await Plantas.create(req.body)
        return res.status(200).json(plantas);


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message })
    }

})

app.listen(port, () => {
    mongoose.connect('mongodb+srv://joperdo:ARDIrCKOk977XFOI@joperdo.ebbddm4.mongodb.net/?retryWrites=true&w=majority&appName=joperdo')
    console.log(`Rodando na porta ${port}`)
})