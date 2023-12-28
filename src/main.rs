use actix_web::{HttpServer, App, web, middleware::Logger};
use danielmcourtney::{tmpl::{Tmpl, TMPL}, handlers, db::{Config, JsonStore, CONFIG, Experience}};
use env_logger::Env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config_store = JsonStore::<Config>::new("data/config.json");
    let exp_store = JsonStore::<Vec<Experience>>::new("data/experience.json");
    TMPL.set(Tmpl::new("templates/**/*.tmpl").unwrap()).unwrap();
    CONFIG.set(config_store.read()?).unwrap();

    let tmpl = web::Data::new(TMPL.get().unwrap());
    let config = web::Data::new(CONFIG.get().unwrap());
    let exp = web::Data::new(exp_store.read()?);

    env_logger::init_from_env(Env::new().default_filter_or("info"));

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .app_data(tmpl.clone())
            .app_data(config.clone())
            .app_data(exp.clone())
            .route("/", web::to(handlers::home_page))
            .route("/contact", web::to(handlers::contact_page))
            .route("/experience", web::to(handlers::experience_page))
            .default_service(web::to(handlers::default_handler))
            .service(actix_files::Files::new("/", "public"))
    })
    .workers(4)
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}
