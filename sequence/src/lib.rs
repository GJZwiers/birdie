use bio::seq_analysis::gc::{
    gc_content as bio_gc_content,
    gc3_content as bio_gc3_content,
};
use wasm_bindgen::prelude::wasm_bindgen;

/// Returns the ratio of bases which are guanine (G) or cytosine (C).
#[wasm_bindgen(method)]
pub fn gc_content(sequence: &str) -> f32 {
    bio_gc_content(sequence.as_bytes())
}

/// Returns the ratio of bases in the 3rd position which are guanine (G) or cytosine (C).
#[wasm_bindgen(method)]
pub fn gc3_content(sequence: &str) -> f32 {
    bio_gc3_content(sequence.as_bytes())
}
