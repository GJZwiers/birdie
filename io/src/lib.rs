use wasm_bindgen::{prelude::wasm_bindgen, JsValue};
use bio::io::fasta;
// use web_sys::console;
use js_sys::Array;
use std::str;
use serde::{Serialize, Deserialize};

extern crate console_error_panic_hook;
use std::panic;

// For printing Rust panics in JS
fn my_init_function() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
struct Fasta {
    id: String,
    seq: String,
    len: usize,
    desc: String
}

/// Reads a file in FASTA format. Returns an array of objects containing IDs, sequences and descriptions.
#[wasm_bindgen(typescript_type = "Array<string>")]
pub fn read_fasta_file(file: &[u8]) -> Array {
    my_init_function();
    let reader = fasta::Reader::new(file);

    let mut nb_reads = 0;
    let mut nb_bases = 0;

    let mut fastas = Vec::new();
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
        
        nb_reads += 1;
        nb_bases += record.seq().len();

        let fasta = Fasta {
            id: record.id().into(),
            seq: b.into(),
            len: record.seq().len().into(),
            desc: d.into(),
        };
        fastas.push(fasta);
    }

    fastas.into_iter().map({ |f|
        JsValue::from_serde(&f).unwrap()
    }).collect::<Array>()
}
