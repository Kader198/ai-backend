const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const sequelize = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const models = require('./models');
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Database connection and server start
const PORT = process.env.PORT || 5500;

const initializeDatabase = async () => {
  const dbPath = path.join(__dirname, 'database.sqlite');
  
  try {
    // Ensure proper permissions on database directory
    await fs.chmod(path.dirname(dbPath), 0o755).catch(() => {});
    
    // Check if database exists
    try {
      await fs.access(dbPath);
      // If file exists, ensure write permissions and delete in development
      await fs.chmod(dbPath, 0o666);
      
      if (process.env.NODE_ENV === 'development') {
        await fs.unlink(dbPath);
        console.log('Existing database deleted.');
      }
    } catch (err) {
      // File doesn't exist, that's fine
    }

    // Create empty database file with proper permissions
    if (!fsSync.existsSync(dbPath)) {
      await fs.writeFile(dbPath, '', { mode: 0o666 });
    }

    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

const startServer = async () => {
  try {
    // Initialize database file and permissions
    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      throw new Error('Failed to initialize database');
    }

    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    await sequelize.sync({ 
      force: process.env.NODE_ENV === 'development'
    });
    
    console.log(`Database synchronized (${process.env.NODE_ENV === 'development' ? 'tables recreated' : 'tables altered'}).`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Ensure uploads directory exists with proper permissions
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdir(uploadsDir, { recursive: true, mode: 0o755 })
  .then(() => {
    startServer();
  })
  .catch(err => {
    console.error('Error creating uploads directory:', err);
    process.exit(1);
  }); 