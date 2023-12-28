use std::path::Path;

use actix_web::{HttpServer, App, web, middleware::Logger};
use danielmcourtney::{tmpl::{Tmpl, TMPL}, handlers, db::{Config, JsonStore, CONFIG_STORE, Experience}};
use env_logger::Env;
use clap::Parser;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    #[arg(short, long, default_value_t = String::from("/usr/share/danielmcourtney"))]
    dir: String,

    #[arg(short, long, default_value_t = 4000)]
    port: u16,

    #[arg(short, long, default_value_t = String::from("0.0.0.0"))]
    address: String,

    #[arg(short, long, help = "Number of worker threads, otherwise number of cores")]
    threads: Option<usize>
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let args = Args::parse();
    let path = Path::new(&args.dir);

    let config_store = JsonStore::<Config>::new(&path.join("data/config.json").to_str().unwrap());
    let exp_store = JsonStore::<Vec<Experience>>::new(&path.join("data/experience.json").to_str().unwrap());
    let mut template_glob = path.join("templates").to_str().unwrap().to_string();
    template_glob.push_str("/**/*.tmpl");

    TMPL.set(Tmpl::new(template_glob.as_str()).unwrap()).unwrap();
    CONFIG_STORE.set(config_store).unwrap();

    let tmpl = web::Data::new(TMPL.get().unwrap());
    let config = web::Data::new(CONFIG_STORE.get().unwrap());
    let exp = web::Data::new(exp_store);

    env_logger::init_from_env(Env::new().default_filter_or("info"));

    let mut server = HttpServer::new(move || {
        let mut app = App::new()
            .wrap(Logger::default())
            .app_data(tmpl.clone())
            .app_data(config.clone())
            .app_data(exp.clone())
            .route("/", web::to(handlers::home_page))
            .route("/contact", web::to(handlers::contact_page))
            .route("/experience", web::to(handlers::experience_page))
            .default_service(web::to(handlers::default_handler));
        if cfg!(debug_assertions) {
            app = app.service(actix_files::Files::new("/", Path::new(&args.dir).join("public").to_str().unwrap()))
        }
        app
    });
    if let Some(threads) = args.threads {
        server = server.workers(threads);
    }
    server
        .bind((args.address, args.port))?
        .run()
        .await
}
