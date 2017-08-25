module.exports = app => {
    const Objetos = app.db_config.models.objetos;
    app.get("/api", (req, res) => res.json(
        {
            status: "Generic ORM API"
        }
    ));

    app.route("/api/configuracion/objetos")
        .get((req, res) => {
            Objetos.findAll({})
                .then(objetos => res.json(objetos))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Objetos.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

    app.route("/api/configuracion/objeto/:id")
        .get((req, res) => {
            Objetos.findOne({
                where: { 'id_objeto': req.params.id },
                include: [{ all: true, nested: true }]
            })
                .then(objetos => res.json(objetos))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });

        })
        .put((req, res) => {
            Objetos.update(req.body, {where:{id_objeto:req.params.id}})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .delete(() => {

        });
};