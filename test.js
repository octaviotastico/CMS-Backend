const struct = require('python-struct');

const msg = [struct.pack("B", 0x10 | (0x2 & 0xF))]

console.log(msg)

const eid = "109156be-c4fb-41ea-b1b4-efe1671c5836"

msg.push(struct.pack("!H", eid.length))

console.log(msg)

msg.push(Buffer.from(eid, "ascii"));

console.log(msg)
