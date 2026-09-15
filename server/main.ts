import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import staticFiles from '@fastify/static';
import { resolve } from 'path';
import { DatabaseService } from './services/database-service';
import { ImageService } from './services/image-service';
import { PhotosService } from './photos/photos-service';
import { AlbumsService } from './albums/albums-service';
import { photosRoutes } from './photos/photos-routes';
import { albumsRoutes } from './albums/albums-routes';

// Simulated API latency — useful for testing loading states on the frontend.
// Defaults to 1500ms; set API_DELAY_MS=0 to disable.
const apiDelayMs = parseInt(process.env.API_DELAY_MS || '1500');

// Start server
const start = async () => {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(import('@fastify/cors'), {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Register multipart for file uploads
  await fastify.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB
    },
  });

  // Serve static images
  await fastify.register(staticFiles, {
    root: resolve(process.cwd(), 'data', 'images'),
    prefix: '/images/',
  });

  // Delay API responses to simulate latency (useful for testing loading
  // states). Skips /images/* so static files are served without delay.
  if (apiDelayMs > 0) {
    fastify.addHook('onRequest', async (request) => {
      if (request.url.startsWith('/images/')) return;
      await new Promise((done) => setTimeout(done, apiDelayMs));
    });
  }

  // Initialize services
  const databaseService = new DatabaseService();
  await databaseService.initialize();

  const imageService = new ImageService();
  const photosService = new PhotosService(databaseService, imageService);
  const albumsService = new AlbumsService(databaseService);

  // Register routes
  await photosRoutes(fastify, photosService);
  await albumsRoutes(fastify, albumsService);

  // Health check endpoint
  fastify.get('/health', async (request, reply) => {
    reply.send({ status: 'ok', timestamp: new Date().toISOString() });
  });

  try {
    const port = parseInt(process.env.PORT || '5799');

    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📁 Images served at http://localhost:${port}/images/`);
    console.log(`🏥 Health check at http://localhost:${port}/health`);
    console.log(`📂 Data directory: ${resolve(process.cwd(), 'data')}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
