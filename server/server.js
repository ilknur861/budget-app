// server.js

const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('✅ API endpoints:');
  console.log('   GET    /api/transactions');
  console.log('   POST   /api/transactions');
  console.log('   DELETE /api/transactions/:id');
  console.log('   PUT    /api/transactions/:id');
});