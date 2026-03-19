import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const revert = process.argv.includes('--revert')
const guideDir = resolve(import.meta.dirname, '..', 'guide')

function walkDir(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (entry === '.vitepress' || entry === 'node_modules') continue
    if (statSync(full).isDirectory()) files.push(...walkDir(full))
    else if (full.endsWith('.md')) files.push(full)
  }
  return files
}

const files = walkDir(guideDir)
let modified = 0
const MARKER = '⟨'  // Unicode left angle bracket, visually similar to <

for (const file of files) {
  let content = readFileSync(file, 'utf-8')
  const original = content

  if (revert) {
    content = content.replaceAll(MARKER, '<')
  } else {
    // Only escape < before uppercase letters inside fenced code blocks
    // This prevents Vue from seeing <Image>, <Component>, etc. as Vue components
    content = content.replace(
      /(```[^\n]*\n)([\s\S]*?)(```)/g,
      (_m, open, body, close) => {
        // Replace <UpperCase with marker+UpperCase
        const escaped = body.replace(/<([A-Z])/g, MARKER + '$1')
        // Also replace </UpperCase (closing tags)
        .replace(/<(\/[A-Z])/g, MARKER + '$1')
        return open + escaped + close
      }
    )
  }

  if (content !== original) {
    writeFileSync(file, content)
    modified++
  }
}

console.log(`${revert ? 'Reverted' : 'Escaped'} ${modified} files`)
