# Birdie - Bioinformatics for Deno

Birdie is a Deno project that provides users with fast WebAssembly code to run
common tasks in bioinformatics on the Web, such as DNA sequence analysis. It
uses Rust in the background and makes use of its excellent
[`bio`](https://docs.rs/bio/0.37.1/bio/index.html) crate, and aims to provide a
straightforward API in Deno as well as high speed computation.

All of Birdie's WebAssembly modules are benchmarked and compared with known
JavaScript implementations where possible, as to deliver performant code that
can be easily integrated with other Web technologies to develop a variety of
bioinformatics applications.

At this moment, the following modules are available:

- `distance`: Calculate Levenshtein edit distance using one of several
  algorithms, including Wagner-Fischer and Myers' Algorithm.

- `sequence`: Perform DNA sequence analysis, such as calculating
  Guanine-Cytosine ratio.
