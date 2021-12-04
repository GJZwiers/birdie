use wasm_bindgen::prelude::wasm_bindgen;
use seq_io::fasta::{Reader, Record};
use std::io;

extern crate console_error_panic_hook;
use std::panic;

// For printing Rust errors in the JS context
fn my_init_function() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}

/// Read a file in FASTA format to stdout. Note: not supported on Windows
#[wasm_bindgen(method)]
pub fn read_fasta_file(filename: &str) {
    my_init_function();
    let mut reader = Reader::from_path(filename).unwrap();

    let mut stdout = io::stdout();
    
    while let Some(result) = reader.next() {
        let record = result.unwrap();
        // determine sequence length
        let seqlen = record.seq_lines()
                           .fold(0, |l, seq| l + seq.len());

        if seqlen > 100 {
            record.write_wrap(&mut stdout, 80).unwrap();
        } else {
            eprintln!("{} is only {} long", record.id().unwrap(), seqlen);
        }
    }
}
