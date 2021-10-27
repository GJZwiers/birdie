use bio::pattern_matching::{bndm, bom::BOM, horspool::Horspool, kmp, shift_and};
use wasm_bindgen::prelude::wasm_bindgen;

/// ShiftAnd algorithm for pattern matching. Patterns may contain at most 64 symbols.
/// Complexity: O(n) with text length n.
#[wasm_bindgen(method)]
pub fn shift_and(pattern: &str, text: &str) -> usize {
    let shiftand = shift_and::ShiftAnd::new(pattern.as_bytes());
    let occ = shiftand.find_all(text.as_bytes()).next().unwrap();
    return occ;
}

/// Algorithm of Knuth, Morris and Pratt.
#[wasm_bindgen(method)]
pub fn kmp(pattern: &str, text: &str) -> Vec<usize> {
    let kmp = kmp::KMP::new(pattern.as_bytes());
    let occ: Vec<usize> = kmp.find_all(text.as_bytes()).collect();
    return occ;
}

/// Algorithm of Horspool. Window-based, similar to but faster than Boyer-Moore.
#[wasm_bindgen(method)]
pub fn horspool(pattern: &str, text: &str) -> Vec<usize> {
    let horspool = Horspool::new(pattern.as_bytes());
    let occ: Vec<usize> = horspool.find_all(text.as_bytes()).collect();
    return occ; // assert_eq!(occ, [8, 25]);
}

/// Backward oracle matching algorithm.
#[wasm_bindgen(method)]
pub fn bom(pattern: &str, text: &str) -> Vec<usize> {
    let bom = BOM::new(pattern.as_bytes());
    let occ: Vec<usize> = bom.find_all(text.as_bytes()).collect();
    return occ; // assert_eq!(occ, [8, 25]);
}

/// Backward nondeterministic DAWG matching (BNDM).
#[wasm_bindgen(method)]
pub fn bndm(pattern: &str, text: &str) -> Vec<usize> {
    let bndm = bndm::BNDM::new(pattern.as_bytes());
    let occ: Vec<usize> = bndm.find_all(text.as_bytes()).collect();
    return occ;
}
