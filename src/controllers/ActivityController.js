const mongoose = require("mongoose");

const Activity = mongoose.model("Activity");

const Yup = require("yup");

module.exports = {
    // listagem
    async index(req, res){
        const activities = await Activity.find();

        return res.json(activities);
    },

    // criação
    async store(req, res){
        /*const schema = Yup.object().shape({
            code: Yup.number().require(),
            work_shift: Yup.string().require(),
            day: Yup.string().require(),
            responsible: Yup.string().require()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"});
        };*/

        const activity = await Activity.create(req.body);

        return res.json(activity);
    },

    // consulta
    async show(req, res){
        const activity = await Activity.findById(req.params.id);

        return res.json(activity);
    },

    // atualizar
    async update(req, res){
        /*const schema = Yup.object().shape({
            code: Yup.number(),
            work_shift: Yup.string(),
            day: Yup.string(),
            responsible: Yup.string()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: "Validation fails"});
        };*/
        
        const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        return res.json(activity);
    },

    // excluir
    async destroy(req, res){
        await Activity.findByIdAndRemove(req.params.id);

        return res.send();
    }

};