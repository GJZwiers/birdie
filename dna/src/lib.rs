use wasm_bindgen::prelude::wasm_bindgen;

/// Takes a string of DNA and transcribes it to RNA. 
/// Uses WebAssembly and computes approx. 4x faster for 1 mil chars than its
/// JavaScript counterpart when tested with the Performance Web API.
#[wasm_bindgen]
pub fn transcribe(s: &str) -> String {
    let mut transcript = String::from("");

    for c in s.chars() {
        if c == 'A' {
            transcript += "U";
        } else if c == 'T' {
            transcript += "A";
        } else if c == 'C' {
            transcript += "G";
        } else if c == 'G' {
            transcript += "C";
        }
    }

    return transcript;
}
