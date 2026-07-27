import dns from 'dns';

// Force a reliable DNS resolver for Node to resolve MongoDB SRV records
dns.setServers(['8.8.8.8']);

// Import the app entrypoint
import('./src/app.js').catch(err => {
  console.error('Failed to start app:', err);
  process.exit(1);
});
