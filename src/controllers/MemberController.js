const mongoose = require("mongoose");

const Member = mongoose.model("Member");

const Yup = require("yup");

module.exports = {
    // listagem
    async index(req, res){
        const members = await Member.find();

        return res.json(members);
    },

    // criação
    async store(req, res){
        /*const schema = Yup.object().shape({
            name: Yup.string().require(),
            email: Yup.string().require(),
            cpf: Yup.string().require(),
            address: Yup.string().require(),
            birth: Yup.string().require(),
            phone: Yup.number().require(),
            profession: Yup.string().require()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"});
        };*/

        const member = await Member.create(req.body);

        return res.json(member);
    },

    // consulta
    async show(req, res){
        const member = await Member.findById(req.params.id);

        return res.json(member);
    },

    // atualizar
    async update(req, res){
        /*const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            cpf: Yup.string(),
            address: Yup.string(),
            birth: Yup.string(),
            phone: Yup.number(),
            profession: Yup.string()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"});
        };*/

        const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        return res.json(member);
    },

    // excluir
    async destroy(req, res){
        await Member.findByIdAndRemove(req.params.id);

        return res.send();
    }

};