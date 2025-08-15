import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Mock API handler for chat endpoint
const mockApiPlugin = () => {
  return {
    name: 'mock-api',
    configureServer(server: any) {
      server.middlewares.use('/api/chat', async (req: any, res: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk.toString();
          });
          
          req.on('end', () => {
            try {
              const { messages, model, webSearch } = JSON.parse(body);
              
              // Mock response with parts structure
              const responseMessage = {
                id: Date.now().toString(),
                role: 'assistant',
                content: `Mock response using ${model}${webSearch ? ' with web search' : ''}`,
                parts: [
                  {
                    type: 'text',
                    text: `This is a simulated response using the AI SDK structure. Model: ${model}${webSearch ? ', with web search enabled' : ''}. This demonstrates how AI Elements work with the useChat hook and message parts.`
                  },
                  ...(Math.random() > 0.5 ? [{
                    type: 'reasoning',
                    text: 'Let me think about this step by step:\n1. Analyzing the user input\n2. Considering the context\n3. Formulating a helpful response'
                  }] : []),
                  ...(webSearch ? [{
                    type: 'source-url',
                    url: 'https://docs.ai-elements.dev',
                    title: 'AI Elements Documentation'
                  }] : [])
                ]
              };

              res.writeHead(200, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
              });
              
              res.end(JSON.stringify(responseMessage));
              
            } catch (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal server error' }));
            }
          });
        } else if (req.method === 'OPTIONS') {
          res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
          res.end();
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
