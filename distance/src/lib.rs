use bio::{
    alignment::distance::levenshtein as distance,
    alignment::distance::hamming as hamdist,
    pattern_matching::myers
};
use js_sys::{ArrayBuffer, JsString, Uint32Array};
use math::round::ceil;
use std::{cmp::min, convert::TryInto};
use wasm_bindgen::prelude::wasm_bindgen;

extern crate console_error_panic_hook;
use std::panic;

// For printing Rust errors in the JS context
fn my_init_function() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}

/// Calculates the Hamming distance between `a` and `b`.
#[wasm_bindgen(method)]
pub fn hamming(a: &str, b: &str) -> u64 {
    if a.len() != b.len() {
        panic!("Error: strings need to be of equal length to calculate Hamming distance");
    }
    hamdist(a.as_bytes(), b.as_bytes())
}

/// Calculates the Levenshtein distance between `a` and `b` using
/// the Wagner-Fischer algorithm.
#[wasm_bindgen(method)]
pub fn levenshtein(a: &str, b: &str) -> u32 {
    distance(a.as_bytes(), b.as_bytes())
}

#[wasm_bindgen(method)]
pub fn myers_distance(a: &str, b: &str) -> usize {
    // myers::long::Myers
    let myers = myers::long::Myers::<u128>::new(a.as_bytes());
    myers.distance(b.as_bytes())
}

/// Calculates the Levenshtein distance between `a` and `b` using
/// Myers' Algorithm.
///
/// Credits for the original JS implementation go to the `fastest-levenshtein` 
/// contributors. See https://github.com/ka-weihe/fastest-levenshtein
#[wasm_bindgen(method)]
pub fn myers(mut a: JsString, mut b: JsString) -> u32 {
    if a.length() < b.length() {
        let tmp = b;
        b = a;
        a = tmp;
    }
    if b.length() == 0 {
        return a.length();
    }
    if a.length() <= 32 {
        return myers_32(&a, &b);
    }
    return myers_x(&a, &b);
}

#[wasm_bindgen(method)]
pub fn myers_32(a: &JsString, b: &JsString) -> u32 {
    let peq = Uint32Array::new(&ArrayBuffer::new(0x10000));
    let n = a.length();
    let m = b.length();
    let lst = 1 << (n - 1);
    let mut pv = -1;
    let mut mv = 0;
    let mut sc = n;
    let mut i = n;
    while i > 0 {
        i -= 1;
        let char = a.char_code_at(i) as u32;
        let val = peq.get_index(char);
        peq.set_index(char, val | 1 << i);
    }
    for i in 0..m {
        let char = b.char_code_at(i) as u32;
        let mut eq = peq.get_index(char) as i32;
        let xv = eq | mv;
        eq |= ((eq & pv) + pv) ^ pv;
        mv |= !(eq | pv);
        pv &= eq;
        if (mv & lst) != 0 {
            sc += 1;
        }
        if (pv & lst) != 0 {
            sc -= 1;
        }
        mv = (mv << 1) | 1;
        pv = (pv << 1) | !(xv | mv);
        mv &= xv;
    }
    i = n;
    while i > 0 {
        i -= 1;
        let char = a.char_code_at(i);
        peq.set_index(char as u32, 0);
    }
    return sc;
}

// Warning: may contain scary code.
#[wasm_bindgen(method)]
pub fn myers_x(b: &JsString, a: &JsString) -> u32 {
    let peq = Uint32Array::new(&ArrayBuffer::new(0x10000));
    let n = a.length();
    let m = b.length();
    let hsize = ceil((n / 32).into(), 1);
    let vsize = ceil((m / 32).into(), 1);
    let mut mhc = vec![];
    let mut phc = vec![];
    for _i in 0..hsize as usize {
        /*
        4294967295 = -1 as a u32 (Two's complement), reason being
        that other type casts that were needed when using i32 would not go well
        and cause incorrect results
        */
        phc.push(4294967295);
        mhc.push(0);
    }

    let mut jj = 0;
    for j in 0..(vsize - 1.) as usize {  
        let mut mv = 0;
        let mut pv = 4294967295;
        let start = jj * 32;
        let vlen = min(32, m) + start;
        for k in start..vlen {
            let char = b.char_code_at(k) as u32;
            let val = peq.get_index(char);
            peq.set_index(char, val | 1 << k);
        }
        for i in 0..n as usize {
            let char = a.char_code_at(i.try_into().unwrap());
            let val = peq.get_index(char as u32);
            let eq = val;
            let pb = (phc[(i / 32) | 0] >> i % 32) & 1;
            let mb = (mhc[(i / 32) | 0] >> i % 32) & 1;
            let xv = eq | mv;
            let xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
            let mut ph = mv | !(xh | pv);
            let mut mh = pv & xh;
            if ((ph >> 31) ^ pb) != 0 {
                phc[(i / 32) | 0] ^= 1 << i % 32;
            }
            if ((mh >> 31) ^ mb) != 0 {
                mhc[(i / 32) | 0] ^= 1 << i % 32;
            }
            ph = (ph << 1) | pb;
            mh = (mh << 1) | mb;
            pv = mh | !(xv | ph);
            mv = ph & xv;
        }
        for k in start..vlen {
            peq.set_index(b.char_code_at(k) as u32, 0);
        }
        jj += 1;
    }

    let mut mv = 0;
    let mut pv: u32 = 4294967295;
    let start = (jj * 32).try_into().unwrap();
    let vlen = min(32, m - start) + start;
 
    for k in start..vlen {
        let char = b.char_code_at(k);
        let val = peq.get_index(char as u32);
        peq.set_index(char as u32, val | 1 << k);

    }
    let mut score = m;
 
    for i in 0..n as usize {
        let char = a.char_code_at(i.try_into().unwrap());
        let val = peq.get_index(char as u32);
        let eq = val;
        
        let pb = (phc[(i / 32) | 0] >> i % 32) & 1;
        let mb = (mhc[(i / 32) | 0] >> i % 32) & 1;

        let xv = eq | mv;
        let xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;

        let mut ph = mv | !(xh | pv);
        let mut mh = pv & xh;
        score += (ph >> ((m % 32) - 1)) & 1;
        score -= (mh >> ((m % 32) - 1)) & 1;

        if ((ph >> 31) ^ pb) != 0 {
            phc[(i / 32) | 0] ^= 1 << i % 32;
        }
        if ((mh >> 31) ^ mb) != 0 {
            mhc[(i / 32) | 0] ^= 1 << i % 32;
        }
        ph = (ph << 1) | pb;
        mh = (mh << 1) | mb;
        pv = mh | !(xv | ph);
        mv = ph & xv;
    }
    for k in start..vlen {
        peq.set_index(b.char_code_at(k) as u32, 0);
    }
    return score as u32;
}
