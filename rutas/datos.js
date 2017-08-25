module.exports = app => {
    const Objetos = app.db_config.models.objetos;
    app.route("/api/:coleccion")
        .get((req, res) => {
            Objetos.findOne({ where: { 'objeto': req.params.coleccion, 'coleccion': true } })
                .then((objeto) => {
                    if (objeto) {
                        app.db_datos.sequelize.query("select * from " + objeto.tabla, { type: app.db_datos.sequelize.QueryTypes.SELECT })
                            .then((objeto) => {
                                if (objeto.length > 0)
                                    res.json(objeto);
                                else
                                    res.sendStatus(404);
                            })
                            .catch(error => {
                                res.status(412).json({ msg: error.message });
                            });
                    }
                    else
                        res.sendStatus(404);
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });

        })
        .post((req, res) => {

        });

    app.route("/api/:objeto/:id")
        .get((req, res) => {
            Objetos.findOne({
                where: { 'objeto': req.params.objeto, 'coleccion': false },
                include: [{ all: true, nested: true }]
            })
                .then((objeto_configuracion) => {
                    if (objeto_configuracion) {
                        let Columna_PK = '';
                        let PK_Identity = objeto_configuracion.objetos_propiedades.find(p => p.clave_principal == true && p.campo_identity == true);
                        let PK = objeto_configuracion.objetos_propiedades.find(p => p.clave_principal == true);
                        let Identity = objeto_configuracion.objetos_propiedades.find(p => p.campo_identity == true);
                        let PK_Vista = objeto_configuracion.objetos_propiedades.find(p => p.clave_personalizada != null && p.clave_personalizada != '');

                        if (PK_Identity)
                            Columna_PK = PK_Identity.propiedad;
                        else if (PK)
                            Columna_PK = PK.propiedad;
                        else if (Identity)
                            Columna_PK = Identity.propiedad;
                        else if (PK_Vista)
                            Columna_PK = PK_Vista.propiedad;
                        else{
                            res.sendStatus(404);
                            return;
                        }
                        app.db_datos.sequelize.query("select  * from " + objeto_configuracion.tabla + " where " + Columna_PK + " = :id", { replacements: { id: req.params.id }, type: app.db_datos.sequelize.QueryTypes.SELECT })
                            .then((objeto_datos) => {
                                if (objeto_datos.length > 0)
                                    res.json(objeto_datos);
                                else
                                    res.sendStatus(404);
                            })
                            .catch(error => {
                                res.status(412).json({ msg: error.message });
                            });
                    }
                    else
                        res.sendStatus(404);
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });

        })
        .put((req, res) => {

        })
        .delete(() => {

        });
};