// config/corsOptions.config.js

const allowedOrigins = [
  "http://localhost:5173",       // Vite frontend
  "http://localhost:3000",
  "https://your-production-domain.com",
];

// Professional CORS options
export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  // Allow sending cookies (HTTP-only cookie auth)
  credentials: true,

  // Expose additional headers if needed
  exposedHeaders: ["Content-Length", "X-Requested-With"],

  // Acceptable request headers
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin"
  ],

  // Allow ALL methods explicitly
  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
    "HEAD"
  ],

  // For preflight success response
  optionsSuccessStatus: 204,
};
