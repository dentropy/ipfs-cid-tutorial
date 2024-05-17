import { CarIndexedReader, CarReader } from '@ipld/car';
import fs from 'fs'
import { recursive as exporter } from 'ipfs-unixfs-exporter'

// const filename = "./test.car"
const filename = "./example.car"
const carReader = await CarIndexedReader.fromFile(filename);
console.log(carReader)
console.log(Object.keys(carReader))
console.log(Object.keys(carReader._roots))
console.log(carReader._roots[0])
console.log(Object.keys(carReader._roots[0]))
console.log("\n\ncode")
console.log(carReader._roots[0].code)
console.log("\n\nersion")
console.log(carReader._roots[0].version)
console.log("\n\nmultihash")
console.log(carReader._roots[0].multihash)
console.log("\n\nbytes")
console.log(carReader._roots[0].bytes)
console.log("\n\nbackslash")
console.log(carReader._roots[0]["/"])
const decoder = new TextDecoder('utf-8'); 
let unicode_CID = decoder.decode(carReader._roots[0].bytes);
console.log(unicode_CID)


// Decode a single CID
// console.log("\n\n\n\n")
// const inStream = fs.createReadStream('example.car')
// const reader = await CarReader.fromIterable(inStream)
// console.log(reader)
// const roots = await reader.getRoots()
// console.log(roots)
// const got = await reader.get(roots[0])
// console.log(got)
// let the_root = new TextDecoder().decode(got.bytes).toString()
// console.log(the_root)


// Iterate through CIDs
console.log("\n\n\n\n")
const inStream = fs.createReadStream('test.car')
const reader = await CarReader.fromIterable(inStream)
console.log(reader)
const roots = await reader.getRoots()
console.log(roots)
const got = await reader.get(roots[0])
console.log(got)
let the_root = new TextDecoder().decode(got.bytes).toString()
console.log(the_root)
let mah_data = await reader.cids()
for await (const val of reader.cids()) {
    console.log("\n\n\nval")
    console.log(val)
    let individual_CID = await reader.get(val)  
    console.log(  new TextDecoder().decode(individual_CID.bytes).toString() ) 
}


// List file paths
// console.log("\n\n\n\n")
// const inStream = fs.createReadStream('test.car')
// const reader = await CarReader.fromIterable(inStream)
// // let mah_blocks = reader.blocks()
// for await (const val of reader.blocks() ) {
//     console.log("\n\n\nval")
//     console.log(val)
//     console.log(val.bytes)
//     let individual_CID = await reader.get(val)  
//     console.log(  new TextDecoder().decode(individual_CID.bytes).toString() ) 
// }


console.log("\n\n\n\n\n\n")
const entries = exporter(roots[0], {
    async get (cid) {
      const block = await reader.get(cid)
      return block.bytes
    }
  })


// console.log(entries)
for await (const entry of entries) {
    // if (entry.type === 'file' || entry.type === 'raw') {
    //   console.log('file', entry.path, entry.content)
    // } else if (entry.type === 'directory') {
    //   console.log('directory', entry.path)
    // }
    console.log("\n\n\n\n\n\n\n entry")
    console.log(entry)
    console.log("\n NEW CONTENT")
    let content_function = await entry.content()
    for await (const mah_content of entry.content()) {
        console.log(mah_content)
    }    
}


console.log(entries[0])