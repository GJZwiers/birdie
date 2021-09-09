use bio::alignment::distance::levenshtein as distance;
use js_sys::{ArrayBuffer, JsString, Uint32Array};
use math::round::ceil;
use std::{cmp::min, convert::TryInto};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub fn levenshtein(a: &str, b: &str) -> u32 {
    distance(a.as_bytes(), b.as_bytes())
}

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
   
    while i > 0 {   // js: i--
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
        if (mv & lst) != 0 {    // if (mv & lst)
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
        peq.set_index(char as u32, 0); //[a.char_code_at(i) as usize]
    }
    return sc;
}

#[wasm_bindgen(method)]
pub fn myers_x(b: &JsString, a: &JsString) -> u32 {
    let peq = Uint32Array::new(&ArrayBuffer::new(0x10000));
    let n = a.length();
    let m = b.length();
    let mut mhc = vec![];   // TODO: convert to array of length `hsize`?
    let mut phc = vec![];
    let hsize = ceil((n / 32).into(), -1);
    let vsize = ceil((m / 32).into(), -1);
    for i in 0..hsize as usize {
        phc.push(-1); // phc[i] = -1;
        mhc.push(0);  // mhc[i] = 0;
    }
    let j = 0;
    for i in j..(vsize as usize - 1) {
        let mut mv = 0;
        let mut pv = -1;
        let start = (j * 32).try_into().unwrap();
        let vlen = min(32, m) + start;
        for k in start..vlen {
            let char = b.char_code_at(k) as u32;
            let val = peq.get_index(char);
            peq.set_index(char, val | 1 << k);
        }
        for i in 0..n as usize {
            let char = a.char_code_at(i.try_into().unwrap());
            let val = peq.get_index(char as u32);
            let eq = val as i32;

            let pb = (phc[(i / 32) | 0] >> i % 32) & 1;
            let mb = (mhc[(i / 32) | 0] >> i % 32) & 1;
            let xv = eq | mv;
            let xh = ((((eq | mb) & pv) + pb) ^ pv) | eq | mb;
            let mut ph = mv | !(xh | pv);
            let mut mh = pv & xh;
            if ((ph >> 31) ^ pb) > 0 { // check if this is the way to check in Rust
                phc[(i / 32) | 0] ^= 1 << i % 32;
            }
            if ((mh >> 31) ^ mb) > 0 {
                mhc[(i / 32) | 0] ^= 1 << i % 32;
            }
            ph = (ph << 1) | pb;
            mh = (mh << 1) | mb;
            pv = mh | !(xh | ph);
            mv = ph & xv;
        }
        for k in start..vlen {
            peq.set_index(b.char_code_at(k) as u32, 0);
        }
    }
    let mut mv = 0;
    let mut pv: i32 = -1;
    let start: u32 = (j * 32).try_into().unwrap();
    let vlen = min(32, m - start) + start;
    for k in start..vlen {
        let char = b.char_code_at(k) as u32;
        let val = peq.get_index(char);
        peq.set_index(char, val | 1 << k);
    }
    let mut score = m as i32;
    for i in 0..n as usize {
        let char = a.char_code_at(i.try_into().unwrap());
        let val = peq.get_index(char as u32);
        let eq = val as i32;

        let pb = (phc[(i / 32) | 0] >> i % 32) & 1;
        let mb = (mhc[(i / 32) | 0] >> i % 32) & 1;
        let xv = eq | mv;
        let xh = ((((eq | mb) & pv) + pv) ^ pv) | eq | mb;
        let mut ph = mv | !(xh | pv);
        let mut mh = pv & xh;
        score += (ph >> ((m % 32) - 1)) & 1;
        score -= (mh >> ((m % 32) - 1)) & 1;
        if ((ph >> 31) ^ pb) > 0 {
            phc[(i / 32) | 0] ^= 1 << i % 32;
        }
        if ((mh >> 31) ^ mb) > 0 {  // or == 1?
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
