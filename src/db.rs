use std::{io::BufReader, fs::File, marker::PhantomData, path::Path, sync::OnceLock};
use serde::{Deserialize, Serialize, de::DeserializeOwned};

#[derive(Debug, Deserialize, Serialize)]
pub struct Config {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub domain: String,
    pub site_name: String,
    pub github: String,
    pub git_url: String
}

#[derive(Debug)]
pub struct JsonStore<T>
where
    T: DeserializeOwned
{
    path: String,
    phantom: PhantomData<T>
}

impl<T> JsonStore<T>
where
    T: DeserializeOwned
{
    pub fn new(path: &str) -> Self {
        JsonStore {
            path: path.to_string(),
            phantom: PhantomData
        }
    }

    pub fn path(&self) -> &Path {
        &Path::new(&self.path)
    }

    pub fn file(&self) -> std::io::Result<File> {
        File::open(self.path())
    }

    pub fn read(&self) -> std::io::Result<T> {
        let rdr = BufReader::new(self.file()?);
        Ok(serde_json::from_reader(rdr)?)
    }
}

pub static CONFIG: OnceLock<Config> = OnceLock::new();
