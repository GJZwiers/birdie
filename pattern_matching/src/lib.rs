use bio::pattern_matching::shift_and;
use wasm_bindgen::prelude::wasm_bindgen;

/// ShiftAnd algorithm for pattern matching. Patterns may contain at most 64 symbols.
/// Complexity: O(n) with text length n.
#[wasm_bindgen(method)]
pub fn shift_and(pattern: &str, text: &str) -> usize {
    let shiftand = shift_and::ShiftAnd::new(pattern.as_bytes());
    return shiftand.find_all(text.as_bytes()).next().unwrap();
}
