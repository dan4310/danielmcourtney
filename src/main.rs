use actix_web::{HttpServer, App, web, middleware::Logger};
use danielmcourtney::{tmpl::{Tmpl, TMPL}, handlers, db::{Config, JsonStore, CONFIG}};
use env_logger::Env;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    TMPL.set(Tmpl::new("templates/**/*.tmpl").unwrap()).unwrap();
    let config_store = JsonStore::<Config>::new("data/config.json");
    CONFIG.set(config_store.read()?).unwrap();

    let tmpl = web::Data::new(TMPL.get().unwrap());
    let config = web::Data::new(CONFIG.get().unwrap());

    env_logger::init_from_env(Env::new().default_filter_or("info"));

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .app_data(tmpl.clone())
            .app_data(config.clone())
            .route("/", web::to(handlers::home_page))
            .route("/contact", web::to(handlers::contact_page))
            .default_service(web::to(handlers::default_handler))
            .service(actix_files::Files::new("/", "public"))
    })
    .bind(("0.0.0.0", 4000))?
    .run()
    .await
}
