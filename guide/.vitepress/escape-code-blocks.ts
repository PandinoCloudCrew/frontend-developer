import type { Plugin } from 'vite'

export function escapeCodeBlocksPlugin(): Plugin {
  return {
    name: 'escape-code-blocks',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md')) return null

      // Escape content inside fenced code blocks
      let result = code
      const blocks: [number, number][] = []
      
      // Find all ``` blocks
      const regex = /```[^\n]*\n[\s\S]*?```/g
      let match
      while ((match = regex.exec(code)) !== null) {
        blocks.push([match.index, match.index + match[0].length])
      }
      
      // Process in reverse to maintain positions
      for (let i = blocks.length - 1; i >= 0; i--) {
        const [start, end] = blocks[i]
        const block = result.substring(start, end)
        const firstNewline = block.indexOf('\n')
        const lastBackticks = block.lastIndexOf('```')
        
        const header = block.substring(0, firstNewline + 1)
        const body = block.substring(firstNewline + 1, lastBackticks)
        const footer = block.substring(lastBackticks)
        
        const escapedBody = body
          .replace(/\{/g, '&#123;')
          .replace(/\}/g, '&#125;')
          .replace(/<([A-Z])/g, '&lt;$1')
          .replace(/<(\/[A-Z])/g, '&lt;$1')
          .replace(/<(img|Image|button|input|form|label|article|section|nav|header|footer|main|div|span|a |p[ >]|h[1-6][ >]|ul|ol|li)/gi, '&lt;$1')
        
        result = result.substring(0, start) + header + escapedBody + footer + result.substring(end)
      }
      
      if (result !== code) {
        return { code: result, map: null }
      }
      return null
    },
  }
}
