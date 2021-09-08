use bio::alignment::distance::levenshtein as distance;
use wasm_bindgen::prelude::wasm_bindgen;
use js_sys::{ArrayBuffer, JsString, Uint32Array};

#[wasm_bindgen]
pub fn levenshtein(a: &str, b: &str) -> u32 {
    distance(a.as_bytes(), b.as_bytes())
}



pub fn myers_32(a: &JsString, b: &JsString) -> u32 {  
    //let peq = Uint32Array::new(&ArrayBuffer::new(0x10000));
    let mut peq: Vec<i32> = vec![];

    let n = a.length();
    let m = b.length();
    let lst = 1 << (n - 1);
    let mut pv = -1;
    let mut mv = 0;
    let mut sc = n;
    let mut i = m;

    while i > 0 {
        peq[a.char_code_at(i) as usize] |= 1 << i;
        i -= 1;
    }
    for i in 0..m {
        let mut eq = peq[b.char_code_at(i) as usize];
        let xv = eq | mv;
        eq |= ((eq & pv) + pv) ^ pv;
        mv |= !(eq | pv);
        pv &= eq;
        if (mv & lst) == 1 {
            sc += 1;
        }
        if (pv & lst) == 1 {
            sc -= 1;
        }
        mv = (mv << 1) | 1;
        pv = (pv << 1) | !(xv | mv);
        mv &= xv;
    }
    i = n;
    while i > 0 {
        peq[a.char_code_at(i) as usize] = 0;
    }
    return sc;
}
