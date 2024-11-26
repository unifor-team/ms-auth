import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "auth_service",
  password: process.env.PG_PASSWORD || "senha",
  port: parseInt(process.env.PG_PORT || "5432"),
});

export const connectDB = async (): Promise<void> => {
  try {
    await pool.connect();
    console.log("PostgreSQL conectado!");
  } catch (error) {
    console.error("Erro ao conectar ao PostgreSQL:", error.message);
    process.exit(1);
  }
};