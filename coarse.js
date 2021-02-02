#!/usr/bin/env node

const fs = require('fs')
const coarse = require('coarse')
const xmlserializer = require('xmlserializer')
const parser = require('parse5')
const { convertDocumentForeignObjectsToText } = require('./convert')

const inputFile = process.argv[2]
const outputFile = process.argv[3]

const original = fs.readFileSync(inputFile)
const roughened = coarse(original, {
    strokeWidth: 1,
    roughness: 0.6,
    bowing: 0.3,
    fillStyle:'hachure'} // hachure(default), solid, zigzag, cross-hatch, dots, dashed, or zigzag-line
)
const parsed = parser.parse(roughened)
const converted = convertDocumentForeignObjectsToText(parsed)
const serialized = xmlserializer.serializeToString(converted)

fs.writeFileSync(outputFile, serialized)
