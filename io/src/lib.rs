use bio::io::fasta;
use js_sys::Array;
use serde::{Serialize, Deserialize};
use std::str;
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};
// use web_sys::console;

extern crate console_error_panic_hook;
use std::panic;

// For printing Rust panics in JS
fn my_init_function() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
struct FastaData {
    id: String,
    seq: String,
    len: usize,
    desc: String
}

/// Reads a file in FASTA format. Returns an array of objects containing IDs, sequences and descriptions.
#[wasm_bindgen(typescript_type = "Array<Fasta>")]
pub fn read_fasta_file(file: &[u8]) -> Array {
    my_init_function();
    let reader = fasta::Reader::new(file);

    let mut records = Vec::new();
    for result in reader.records() {
        let record = result.expect("Error during fasta record parsing");

        let a = record.seq();
        let b = match str::from_utf8(a) {
            Ok(v) => v,
            Err(e) => panic!("Could not convert bytes to string. Error: {}", e),
        };

        let d = match record.desc() {
            Some(s) => s,
            None => "none"
        };

        let data = FastaData {
            id: record.id().into(),
            seq: b.into(),
            len: record.seq().len().into(),
            desc: d.into(),
        };
        records.push(data);
    }

    records.into_iter().map({ |f|
        JsValue::from_serde(&f).unwrap()
    }).collect::<Array>()
}
