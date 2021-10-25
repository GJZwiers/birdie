use bio::pattern_matching::{shift_and, kmp};
// use bio::pattern_matching::pssm::{DNAMotif, Motif};
use wasm_bindgen::prelude::wasm_bindgen;

/// ShiftAnd algorithm for pattern matching. Patterns may contain at most 64 symbols.
/// Complexity: O(n) with text length n.
#[wasm_bindgen(method)]
pub fn shift_and(pattern: &str, text: &str) -> usize {
    let shiftand = shift_and::ShiftAnd::new(pattern.as_bytes());
    return shiftand.find_all(text.as_bytes()).next().unwrap();
}
// Algorithm of Knuth, Morris and Pratt
#[wasm_bindgen]
pub fn kmp(pattern: &str, text: &str) -> Vec<usize> {
    let kmp = kmp::KMP::new(pattern.as_bytes());
    let occ: Vec<usize> = kmp.find_all(text.as_bytes()).collect();
    return occ;
}

// pub fn motif(sequences: Vec<&str>) {
//     let pssm = DNAMotif::from_seqs(
//         vec![ b"AAAA".to_vec(), b"AATA".to_vec(), b"AAGA".to_vec(), b"AAAA".to_vec(), ].as_ref(),
//         None
//     ).unwrap();
//     let start_pos = pssm.score(b"CCCCCAATA").unwrap().loc;
//     println!("motif found at position {}", start_pos);
// }
