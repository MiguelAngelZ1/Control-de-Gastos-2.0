CREATE TABLE IF NOT EXISTS presupuesto (
  persona VARCHAR(20) PRIMARY KEY,
  monto INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS gastos_fijos (
  id SERIAL PRIMARY KEY,
  persona VARCHAR(20) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  monto INTEGER NOT NULL,
  estado VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS gastos_semanales (
  id SERIAL PRIMARY KEY,
  persona VARCHAR(20) NOT NULL,
  semana INTEGER NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  monto INTEGER NOT NULL,
  fecha VARCHAR(20) NOT NULL
);
