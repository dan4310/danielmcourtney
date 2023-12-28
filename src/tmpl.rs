use std::sync::OnceLock;
use tera::{Tera, Error as TeraError};

use crate::db::{Config, Experience};

#[derive(Debug)]
pub struct Error(TeraError);

pub type Result<T> = std::result::Result<T, Error>;

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl std::error::Error for Error {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        Some(&self.0)
    }
}

impl From<TeraError> for Error {
    fn from(value: TeraError) -> Self {
        Error(value)
    }
}

#[derive(Debug)]
pub struct Tmpl(Tera);

impl From<Tera> for Tmpl {
    fn from(value: Tera) -> Self {
        Tmpl(value)
    }
}

impl Tmpl {
    pub fn new(glob: &str) -> Result<Tmpl> {
        Ok(Tmpl::from(Tera::new(glob)?))
    }

    pub fn render(&self, template: &str, ctx: &tera::Context) -> Result<String> {
        Ok(self.0.render(template, ctx)?)
    }

    pub fn render_page(&self, template: &str, ctx: &mut tera::Context, config: &Config) -> Result<String> {
        ctx.insert("config", config);
        self.render(template, ctx)
    }

    pub fn render_home_page(&self, config: &Config) -> Result<String> {
        let mut ctx = tera::Context::new();
        self.render_page("home.tmpl", &mut ctx, config)
    }

    pub fn render_contact_page(&self, config: &Config) -> Result<String> {
        let mut ctx = tera::Context::new();
        self.render_page("contact.tmpl", &mut ctx, config)
    }

    pub fn render_error_page(&self, config: &Config, status: u16, message: &str) -> Result<String> {
        let mut ctx = tera::Context::new();
        ctx.insert("status", &status);
        ctx.insert("message", message);
        self.render_page("error.tmpl", &mut ctx, config)
    }

    pub fn render_experience_page(&self, config: &Config, exp: &Vec<Experience>) -> Result<String> {
        let mut ctx = tera::Context::new();
        ctx.insert("experiences", &exp);
        self.render_page("experience.tmpl", &mut ctx, &config)
    }
}

pub static TMPL: OnceLock<Tmpl> = OnceLock::new();
