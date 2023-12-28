use actix_web::{HttpResponse, http::{header::ContentType, StatusCode}, web, ResponseError};
use crate::{tmpl::{Tmpl, Error as TmplError, TMPL}, db::{Config, CONFIG_STORE, Experience, JsonStore}};

#[derive(Debug)]
pub enum Error {
    TmplError(TmplError),
    IOError(std::io::Error),
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Error::TmplError(e) => write!(f, "TmplError: {e}"),
            Error::IOError(e) => write!(f, "IOError: {e}"),
        }
    }
}

impl std::error::Error for Error {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Error::TmplError(e) => Some(e),
            Error::IOError(e) => Some(e)
        }
    }
}

impl ResponseError for Error {
    fn status_code(&self) -> StatusCode {
        match self {
            Error::TmplError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            Error::IOError(_) => StatusCode::INTERNAL_SERVER_ERROR
        }
    }

    fn error_response(&self) -> HttpResponse<actix_web::body::BoxBody> {
        let code = self.status_code();
        let msg = if code == StatusCode::INTERNAL_SERVER_ERROR { "Internal Server Error".to_string() } else { self.to_string() };
        let mut res = HttpResponse::build(code);

        if let Some(config_store) = CONFIG_STORE.get() {
            if let Some(tmpl) = TMPL.get() {
                if let Ok(config) = config_store.read() {
                    if let Ok(t) = tmpl.render_error_page(&config, code.as_u16(), &msg) {
                        return res.content_type(ContentType::html()).body(t);
                    }
                }
            }
        }

        res.body(msg)
    }
}

impl From<TmplError> for Error {
    fn from(value: TmplError) -> Self {
        Error::TmplError(value)
    }
}

impl From<std::io::Error> for Error {
    fn from(value: std::io::Error) -> Self {
        Error::IOError(value)
    }
}

pub type Result<T> = std::result::Result<T, Error>;

pub async fn home_page(tmpl: web::Data<&Tmpl>, config: web::Data<&JsonStore<Config>>) -> Result<HttpResponse> {
    let t = tmpl.render_home_page(&config.read()?)?;
    Ok(HttpResponse::build(StatusCode::OK)
       .content_type(ContentType::html())
       .body(t))
}

pub async fn contact_page(tmpl: web::Data<&Tmpl>, config: web::Data<&JsonStore<Config>>) -> Result<HttpResponse> {
    let t = tmpl.render_contact_page(&config.read()?)?;
    Ok(HttpResponse::build(StatusCode::OK)
       .content_type(ContentType::html())
       .body(t))
}

pub async fn experience_page(tmpl: web::Data<&Tmpl>, config: web::Data<&JsonStore<Config>>, exp: web::Data<JsonStore<Vec<Experience>>>) -> Result<HttpResponse> {
    let t = tmpl.render_experience_page(&config.read()?, &exp.read()?)?;
    Ok(HttpResponse::build(StatusCode::OK)
       .content_type(ContentType::html())
       .body(t))
}

pub async fn default_handler(tmpl: web::Data<&Tmpl>, config: web::Data<&JsonStore<Config>>) -> Result<HttpResponse> {
    let t = tmpl.render_error_page(&config.read()?, StatusCode::NOT_FOUND.as_u16(), "Page Not Found")?;
    Ok(HttpResponse::build(StatusCode::NOT_FOUND)
       .content_type(ContentType::html())
       .body(t))
}
