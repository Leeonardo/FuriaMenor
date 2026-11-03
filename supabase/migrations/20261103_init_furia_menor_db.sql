-- ==============================================================================
-- FURIA MENOR - ESQUEMA DE BASE DE DATOS RELACIONAL (POSTGRESQL / SUPABASE)
-- Portal Digital de Fútbol Menor y Futsal en Caracas
-- ==============================================================================

-- 1. EXTENSIONES Y TIPOS ENUM
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Rol de usuarios en la plataforma
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin_general', 'delegado', 'arbitro');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Municipios de Caracas
DO $$ BEGIN
    CREATE TYPE caracas_municipality AS ENUM ('Libertador', 'Chacao', 'Baruta', 'Sucre', 'El Hatillo');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Disciplinas deportivas
DO $$ BEGIN
    CREATE TYPE sport_discipline AS ENUM ('Fútbol Campo', 'Fútbol Sala', 'Fútbol 7');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Estatus de jugadores / atletas
DO $$ BEGIN
    CREATE TYPE player_status AS ENUM ('activo', 'suspendido', 'lesionado', 'inactivo');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Estados de partido
DO $$ BEGIN
    CREATE TYPE match_status AS ENUM ('programado', 'en_vivo', 'finalizado', 'suspendido', 'aplazado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 2. TABLAS PRINCIPALES
-- ==============================================================================

-- 2.1 TABLA: CLUBS (Academias y Clubes Deportivos de Caracas)
CREATE TABLE IF NOT EXISTS clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    official_name VARCHAR(200) NOT NULL,
    municipality caracas_municipality NOT NULL,
    zone_detail VARCHAR(255) NOT NULL,
    disciplines TEXT[] NOT NULL DEFAULT ARRAY['Fútbol Sala']::TEXT[],
    logo_url TEXT,
    colors JSONB DEFAULT '{"primary": "#dc2626", "secondary": "#1a1a1a", "names": ["Rojo", "Negro"]}'::JSONB,
    coordinator_name VARCHAR(150),
    contact_phone VARCHAR(50),
    contact_email VARCHAR(100),
    founder_name VARCHAR(150),
    motto TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2.2 TABLA: USERS (Usuarios y Roles del Sistema)
-- Nota: En Supabase, se vincula con auth.users mediante foreign key
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE, -- Referencia a auth.users.id en Supabase Auth
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role user_role NOT NULL DEFAULT 'delegado',
    club_id UUID REFERENCES clubs(id) ON DELETE SET NULL, -- Solo para delegados
    phone VARCHAR(50),
    cedula VARCHAR(30),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2.3 TABLA: CATEGORIES (Divisiones Formativas y Competitivas)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL, -- 'Sub-6', 'Sub-8', 'Sub-10', 'Sub-12', 'Sub-14', 'Sub-16', 'Sub-18', 'Sub-20'
    discipline sport_discipline NOT NULL DEFAULT 'Fútbol Sala',
    division VARCHAR(50) DEFAULT '1era División',
    min_birth_year INT NOT NULL, -- Año mínimo permitido (mayor edad permitida)
    max_birth_year INT NOT NULL, -- Año máximo permitido (menor edad permitida)
    max_players_roster INT DEFAULT 18,
    match_duration_minutes INT DEFAULT 40,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2.4 TABLA: PLAYERS (Atletas Fichados por Club y Categoría)
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    identification_type VARCHAR(5) DEFAULT 'V', -- 'V', 'E', 'P'
    identification_number VARCHAR(30) NOT NULL,
    birth_date DATE NOT NULL,
    jersey_number INT,
    position VARCHAR(50) DEFAULT 'Ala', -- 'Portero', 'Cierre', 'Ala', 'Pívot', etc.
    photo_url TEXT,
    carnet_number VARCHAR(50) UNIQUE,
    status player_status NOT NULL DEFAULT 'activo',
    registered_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT uq_player_doc UNIQUE (identification_type, identification_number)
);

-- 2.5 TABLA: MATCHES (Calendario de Encuentros, Marcadores y Actas)
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tournament_name VARCHAR(150) NOT NULL DEFAULT 'Torneo Daeris',
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    home_club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE RESTRICT,
    away_club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE RESTRICT,
    match_date DATE NOT NULL,
    match_time TIME NOT NULL,
    venue VARCHAR(200) NOT NULL,
    jornada VARCHAR(50) DEFAULT 'Jornada 1',
    referee_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Árbitro asignado
    referee_name VARCHAR(150),
    status match_status NOT NULL DEFAULT 'programado',
    home_score INT DEFAULT NULL,
    away_score INT DEFAULT NULL,
    sheet_photo_url TEXT, -- Foto de la planilla física firmada
    referee_notes TEXT,   -- Observaciones del acta
    finalized_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT chk_different_clubs CHECK (home_club_id <> away_club_id)
);

-- 2.6 TABLA: STANDINGS (Tabla de Posiciones Automatizada por Categoría y Club)
CREATE TABLE IF NOT EXISTS standings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
    played INT NOT NULL DEFAULT 0,
    won INT NOT NULL DEFAULT 0,
    drawn INT NOT NULL DEFAULT 0,
    lost INT NOT NULL DEFAULT 0,
    goals_for INT NOT NULL DEFAULT 0,
    goals_against INT NOT NULL DEFAULT 0,
    goal_difference INT NOT NULL DEFAULT 0,
    points INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT uq_category_club UNIQUE (category_id, club_id)
);

-- 2.7 TABLA: MATCH_EVENTS (Goles, Tarjetas y Sanciones para Goleadores y Fair Play)
CREATE TABLE IF NOT EXISTS match_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
    player_id UUID REFERENCES players(id) ON DELETE SET NULL,
    club_id UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
    event_type VARCHAR(30) NOT NULL, -- 'gol', 'autogol', 'amarilla', 'roja'
    minute VARCHAR(10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ==============================================================================
-- 3. TRIGGERS Y FUNCIONES DE AUTOMATIZACIÓN DE NEGOCIO
-- ==============================================================================

-- 3.1 VALIDACIÓN AUTOMÁTICA DE EDAD EN FICHAJES
CREATE OR REPLACE FUNCTION fn_validate_player_age()
RETURNS TRIGGER AS $$
DECLARE
    cat_min_year INT;
    cat_max_year INT;
    cat_name VARCHAR(50);
    player_birth_year INT;
BEGIN
    SELECT min_birth_year, max_birth_year, name
    INTO cat_min_year, cat_max_year, cat_name
    FROM categories
    WHERE id = NEW.category_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'La categoría seleccionada no existe.';
    END IF;

    player_birth_year := EXTRACT(YEAR FROM NEW.birth_date);

    -- Validación: El año de nacimiento debe estar en el rango de la categoría
    IF player_birth_year < cat_min_year OR player_birth_year > cat_max_year THEN
        RAISE EXCEPTION 'El atleta con año de nacimiento % no cumple con el rango permitido para la categoría % (años permitidos: % a %).',
            player_birth_year, cat_name, cat_min_year, cat_max_year;
    END IF;

    -- Generar número de carnet federativo si no existe
    IF NEW.carnet_number IS NULL OR NEW.carnet_number = '' THEN
        NEW.carnet_number := 'FM-' || TO_CHAR(NOW(), 'YY') || '-' || SUBSTRING(NEW.identification_number FROM LENGTH(NEW.identification_number)-3);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_player_age ON players;
CREATE TRIGGER trg_validate_player_age
    BEFORE INSERT OR UPDATE OF birth_date, category_id
    ON players
    FOR EACH ROW
    EXECUTE FUNCTION fn_validate_player_age();


-- 3.2 RECÁLCULO AUTOMÁTICO DE LA TABLA DE POSICIONES (STANDINGS)
CREATE OR REPLACE FUNCTION fn_recalculate_standings()
RETURNS TRIGGER AS $$
DECLARE
    target_category_id UUID;
    v_club_id UUID;
    r RECORD;
BEGIN
    -- Determinar la categoría afectada
    IF TG_OP = 'DELETE' THEN
        target_category_id := OLD.category_id;
    ELSE
        target_category_id := NEW.category_id;
    END IF;

    -- Solo recalcular si el partido está o estaba en estado 'finalizado'
    IF (TG_OP = 'INSERT' AND NEW.status = 'finalizado') OR
       (TG_OP = 'UPDATE' AND (NEW.status = 'finalizado' OR OLD.status = 'finalizado')) OR
       (TG_OP = 'DELETE' AND OLD.status = 'finalizado') THEN

        -- Recalcular estadísticas para todos los clubes de esta categoría
        FOR v_club_id IN
            SELECT DISTINCT club_id FROM (
                SELECT home_club_id AS club_id FROM matches WHERE category_id = target_category_id
                UNION
                SELECT away_club_id AS club_id FROM matches WHERE category_id = target_category_id
            ) c
        LOOP
            -- Asegurar que existe fila en standings
            INSERT INTO standings (category_id, club_id, played, won, drawn, lost, goals_for, goals_against, goal_difference, points)
            VALUES (target_category_id, v_club_id, 0, 0, 0, 0, 0, 0, 0, 0)
            ON CONFLICT (category_id, club_id) DO NOTHING;

            -- Calcular todas las métricas de los partidos finalizados
            SELECT
                COUNT(*) AS played,
                COUNT(*) FILTER (WHERE (home_club_id = v_club_id AND home_score > away_score) OR (away_club_id = v_club_id AND away_score > home_score)) AS won,
                COUNT(*) FILTER (WHERE home_score = away_score) AS drawn,
                COUNT(*) FILTER (WHERE (home_club_id = v_club_id AND home_score < away_score) OR (away_club_id = v_club_id AND away_score < home_score)) AS lost,
                COALESCE(SUM(CASE WHEN home_club_id = v_club_id THEN home_score ELSE away_score END), 0) AS goals_for,
                COALESCE(SUM(CASE WHEN home_club_id = v_club_id THEN away_score ELSE home_score END), 0) AS goals_against
            INTO r
            FROM matches
            WHERE category_id = target_category_id
              AND status = 'finalizado'
              AND (home_club_id = v_club_id OR away_club_id = v_club_id)
              AND home_score IS NOT NULL
              AND away_score IS NOT NULL;

            -- Actualizar la tabla de posiciones con 3 pts victoria, 1 pt empate
            UPDATE standings
            SET played = r.played,
                won = r.won,
                drawn = r.drawn,
                lost = r.lost,
                goals_for = r.goals_for,
                goals_against = r.goals_against,
                goal_difference = (r.goals_for - r.goals_against),
                points = (r.won * 3) + (r.drawn * 1),
                updated_at = NOW()
            WHERE category_id = target_category_id AND club_id = v_club_id;

        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_recalculate_standings ON matches;
CREATE TRIGGER trg_recalculate_standings
    AFTER INSERT OR UPDATE OF status, home_score, away_score
    ON matches
    FOR EACH ROW
    EXECUTE FUNCTION fn_recalculate_standings();

-- ==============================================================================
-- 4. SEGURIDAD A NIVEL DE FILAS (ROW LEVEL SECURITY - RLS)
-- ==============================================================================
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;

-- 4.1 Lectura pública para el portal digital
CREATE POLICY "Public Read Clubs" ON clubs FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Public Read Standings" ON standings FOR SELECT USING (true);
CREATE POLICY "Public Read Active Players" ON players FOR SELECT USING (status = 'activo');
CREATE POLICY "Public Read Match Events" ON match_events FOR SELECT USING (true);

-- 4.2 Admin General ("Nivel Dios") tiene control total
CREATE POLICY "Admin General All Clubs" ON clubs FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.auth_id = auth.uid() AND users.role = 'admin_general')
);
CREATE POLICY "Admin General All Categories" ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.auth_id = auth.uid() AND users.role = 'admin_general')
);
CREATE POLICY "Admin General All Players" ON players FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.auth_id = auth.uid() AND users.role = 'admin_general')
);
CREATE POLICY "Admin General All Matches" ON matches FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.auth_id = auth.uid() AND users.role = 'admin_general')
);
CREATE POLICY "Admin General All Standings" ON standings FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE users.auth_id = auth.uid() AND users.role = 'admin_general')
);

-- 4.3 Delegados: Solo pueden gestionar los jugadores de su propio club
CREATE POLICY "Delegado Manage Own Club Players" ON players FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
          AND users.role = 'delegado'
          AND users.club_id = players.club_id
    )
);

-- 4.4 Árbitros: Solo pueden actualizar marcadores, notas y fotos de actas de sus partidos
CREATE POLICY "Arbitro Update Assigned Matches" ON matches FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
          AND users.role = 'arbitro'
          AND (matches.referee_id = users.id OR matches.status IN ('programado', 'en_vivo'))
    )
);

-- ==============================================================================
-- 5. DATOS SEMILLA INICIALES (CATEGORÍAS Y CLUBES CARAQUEÑOS)
-- ==============================================================================

-- 5.1 Categorías oficiales vigentes para la temporada 2026
INSERT INTO categories (name, discipline, division, min_birth_year, max_birth_year, match_duration_minutes) VALUES
('Sub-6',  'Fútbol Sala', '1era División', 2020, 2021, 30),
('Sub-8',  'Fútbol Sala', '1era División', 2018, 2019, 35),
('Sub-10', 'Fútbol Sala', '1era División', 2016, 2017, 40),
('Sub-12', 'Fútbol Sala', '1era División', 2014, 2015, 40),
('Sub-14', 'Fútbol Sala', '1era División', 2012, 2013, 45),
('Sub-16', 'Fútbol Sala', '1era División', 2010, 2011, 50),
('Sub-18', 'Fútbol Sala', '1era División', 2008, 2009, 50),
('Sub-20', 'Fútbol Sala', '1era División', 2006, 2007, 50)
ON CONFLICT DO NOTHING;

-- 5.2 Clubes fundadores caraqueños
INSERT INTO clubs (slug, name, official_name, municipality, zone_detail, disciplines, founder_name, coordinator_name, contact_phone, logo_url, motto) VALUES
('la-paz-futsal', 'La Paz Futsal', 'Club Deportivo & Cancha de Futsal La Paz', 'Libertador', 'Sector La Paz · F3J3+88X Caracas 1020', ARRAY['Fútbol Sala'], 'Karing Hunbg', 'Eudis Toro', '+58 414-2345678', '/images/academies/la-paz-futsal.png', 'Pasión, garra y formación deportiva comunitaria'),
('dvo-paraiso', 'DVO Paraíso', 'Deportivo Paraíso Futsal Club', 'Libertador', 'El Paraíso · Av. Páez', ARRAY['Fútbol Sala', 'Fútbol 7'], 'Directiva DVO Paraíso', 'Prof. Roberto Mendoza', '+58 412-5550101', NULL, 'Disciplina, Pasión y Cantera Caraqueña'),
('fratelsa-sport', 'Fratelsa Sport', 'Fratelsa Sport Club Futsal', 'Chacao', 'Chacao · Altamira Sur', ARRAY['Fútbol Sala', 'Fútbol Campo'], 'Carlos Fratelsa', 'Prof. Gianfranco Rossi', '+58 414-3330103', NULL, 'Excelencia formativa y proyección nacional'),
('fenix-fs', 'Fénix FS', 'Fénix Futsal Caracas', 'Libertador', 'San Juan · Cancha Central El Silencio', ARRAY['Fútbol Sala'], 'Javier Fénix', 'Prof. Marcos Valero', '+58 414-2220102', NULL, 'Del barrio al podio con disciplina y técnica')
ON CONFLICT (slug) DO NOTHING;
