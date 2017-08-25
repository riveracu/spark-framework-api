module.exports = app =>{
    app.db_config.sequelize.sync().done(()=>{ 
        //app.db_datos.sequelize.sync().done(()=>{
            app.listen(app.get("port"),()=>{
                console.log("Generic ORM - Port " + app.get("port"));
            });
       // });
    });
};