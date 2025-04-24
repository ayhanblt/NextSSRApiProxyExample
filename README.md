
# Next.js SSR and API Proxy Example

This project demonstrates how to solve common CORS issues when using Server-Side Rendering (SSR) with external APIs in Next.js.

## The Problem

When fetching data from external APIs during SSR, you might encounter CORS errors or timeouts because:
1. The API might block server-side requests
2. CORS headers might not be properly configured for your server's IP
3. The API might expect requests to come from the client-side

## The Solution

This project implements a server-side proxy pattern where:
1. We create a Next.js API route that acts as a proxy
2. The SSR process fetches data through our proxy instead of directly from the external API
3. The proxy handles authentication and CORS headers properly

## Implementation Details

### API Proxy Route (`/pages/api/proxy.ts`)
- Acts as a middleware between your app and the external API
- Handles authentication and error cases
- Can be configured with custom headers and timeouts

### Server-Side Rendering (`/pages/index.tsx`)
- Uses `getServerSideProps` to fetch data during SSR
- Fetches through the proxy to avoid CORS issues
- Handles errors gracefully

## Usage

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000 to see the app in action

## Configuration

To configure the external API:

1. Update the `EXTERNAL_API` constant in `/pages/api/proxy.ts`
2. Add any required authentication headers
3. Configure error handling as needed

## Production Deployment

The proxy pattern ensures that:
- CORS issues are avoided in production
- Sensitive API keys remain secure on the server
- Requests are properly authenticated

## Error Handling

The application includes:
- Graceful error handling for API failures
- Timeout handling for slow responses
- User-friendly error messages
