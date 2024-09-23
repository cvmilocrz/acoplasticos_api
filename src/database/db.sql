CREATE TABLE users (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  user VARCHAR(20) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type TINYINT(1) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE companies (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  NIT VARCHAR(20),
  company_name VARCHAR(255) NOT NULL, -- Razón Social
  acronym VARCHAR(50), -- Sigla
  affiliation_status INT NOT NULL,
  affiliation_date DATE,
  disaffiliation_date DATE,
  industry_sector INT NOT NULL,
  is_producer BOOLEAN NOT NULL, -- Empresa Productora
  primary_activity VARCHAR(255), -- Actividad Principal
  secondary_activity VARCHAR(255), -- Actividad Secundaria
  other_activity_1 VARCHAR(255),
  other_activity_2 VARCHAR(255),
  business_nature INT NOT NULL, -- Naturaleza de operaciones
  institutional_email VARCHAR(100),
  website VARCHAR(255),
  city VARCHAR(100),
  address_type INT,
  address VARCHAR(255),
  phone VARCHAR(50),
  mobile VARCHAR(50) NOT NULL
);

CREATE TABLE contacts (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  NIT VARCHAR(20),
  protocol INT NOT NULL, -- Protocolo
  full_name VARCHAR(255) NOT NULL, -- Nombre del empleado
  position VARCHAR(100), -- Cargo
  email VARCHAR(100),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  address VARCHAR(255),
  city VARCHAR(100),
  FOREIGN KEY (NIT) REFERENCES companies(id) ON DELETE CASCADE -- Relación con la tabla de empresas
);