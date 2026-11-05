-- ==============================================================================
-- FURIA MENOR - CONTROL ESTRICTO DE AUTOGESTIÓN, REGISTRO Y REGLAS DE ROLES
-- Migración: 20261105_strict_auth_and_delegado_rules.sql
-- ==============================================================================

-- 1. REGLA ESTRICTA DE BASE DE DATOS: UN SOLO DELEGADO POR CLUB
-- Creamos un índice único condicional (partial unique index).
-- Solo se aplica cuando el rol es 'delegado' y club_id no es nulo.
-- Esto permite que un club tenga atletas o staff, pero UN SOLO delegado oficial de autogestión.
CREATE UNIQUE INDEX IF NOT EXISTS uq_one_delegado_per_club 
ON users (club_id) 
WHERE role = 'delegado' AND club_id IS NOT NULL;

COMMENT ON INDEX uq_one_delegado_per_club IS 
'Garantiza a nivel de motor relacional que un club o academia solo pueda tener vinculado un único usuario con rol delegado.';


-- 2. REGLA: RESTRICCIÓN DE ROLES EN REGISTRO PÚBLICO
-- Trigger de seguridad para evitar que solicitudes directas a la tabla users
-- puedan auto-asignarse roles elevados ('admin_general' o 'arbitro') sin ser admin.
CREATE OR REPLACE FUNCTION fn_enforce_registration_rules()
RETURNS TRIGGER AS $$
DECLARE
    v_acting_user_role user_role;
    v_existing_delegado_count INT;
    v_club_name VARCHAR(150);
BEGIN
    -- Si es una inserción de usuario nuevo:
    IF TG_OP = 'INSERT' THEN
        -- Obtener el rol del usuario que ejecuta la acción (si está autenticado en Supabase)
        SELECT role INTO v_acting_user_role
        FROM users
        WHERE auth_id = auth.uid()
        LIMIT 1;

        -- 2.1 Si intenta registrarse como 'admin_general' o 'arbitro' sin ser admin autenticado:
        IF NEW.role IN ('admin_general', 'arbitro') THEN
            IF v_acting_user_role IS NULL OR v_acting_user_role <> 'admin_general' THEN
                RAISE EXCEPTION 'Violación de seguridad: No está permitido auto-asignarse el rol de % desde el registro público. La creación de árbitros y administradores es exclusiva del Admin General.', NEW.role;
            END IF;
        END IF;

        -- 2.2 Si el nuevo usuario es 'delegado', debe tener club_id obligatorio
        IF NEW.role = 'delegado' THEN
            IF NEW.club_id IS NULL THEN
                RAISE EXCEPTION 'Un usuario con rol delegado debe estar vinculado obligatoriamente a un club o academia deportiva.';
            END IF;

            -- 2.3 Verificar unicidad de delegado para ese club
            SELECT COUNT(*), (SELECT name FROM clubs WHERE id = NEW.club_id)
            INTO v_existing_delegado_count, v_club_name
            FROM users
            WHERE club_id = NEW.club_id
              AND role = 'delegado'
              AND id <> COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID);

            IF v_existing_delegado_count > 0 THEN
                RAISE EXCEPTION 'El club "%" ya cuenta con un delegado oficial registrado. Cada academia solo puede tener un único delegado asignado.', COALESCE(v_club_name, 'seleccionado');
            END IF;
        END IF;
    END IF;

    -- Si es una actualización de rol:
    IF TG_OP = 'UPDATE' THEN
        IF OLD.role <> NEW.role THEN
            SELECT role INTO v_acting_user_role
            FROM users
            WHERE auth_id = auth.uid()
            LIMIT 1;

            IF v_acting_user_role IS NULL OR v_acting_user_role <> 'admin_general' THEN
                RAISE EXCEPTION 'Solo un Administrador General puede modificar roles de usuario existentes.';
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_enforce_registration_rules ON users;
CREATE TRIGGER trg_enforce_registration_rules
    BEFORE INSERT OR UPDATE
    ON users
    FOR EACH ROW
    EXECUTE FUNCTION fn_enforce_registration_rules();


-- 3. POLÍTICA DE CREACIÓN EXCLUSIVA DE ÁRBITROS POR EL ADMIN GENERAL
-- En RLS, permitimos la inserción con rol 'arbitro' únicamente al admin_general.
CREATE POLICY "Admin General Exclusive Create Arbitros" ON users
FOR INSERT
WITH CHECK (
    -- Si el rol es delegado, permitimos registro público auto-gestionado
    (role = 'delegado')
    OR
    -- Si el rol es arbitro o admin_general, DEBE ser ejecutado por un admin_general existente
    (
        role IN ('arbitro', 'admin_general') AND
        EXISTS (
            SELECT 1 FROM users admin_u
            WHERE admin_u.auth_id = auth.uid()
              AND admin_u.role = 'admin_general'
        )
    )
);

-- 4. FUNCIÓN RPC SEGURA PARA LA CREACIÓN DE ÁRBITROS POR EL ADMIN
CREATE OR REPLACE FUNCTION fn_admin_create_arbitro(
    p_email VARCHAR(255),
    p_full_name VARCHAR(150),
    p_phone VARCHAR(50),
    p_cedula VARCHAR(30),
    p_colegio_arbitros VARCHAR(150) DEFAULT 'Colegio de Árbitros del Distrito Capital'
)
RETURNS JSONB AS $$
DECLARE
    v_admin_role user_role;
    v_new_id UUID;
    v_result JSONB;
BEGIN
    -- 1. Verificar que el usuario que ejecuta la función es Admin General
    SELECT role INTO v_admin_role
    FROM users
    WHERE auth_id = auth.uid();

    IF v_admin_role IS NULL OR v_admin_role <> 'admin_general' THEN
        RAISE EXCEPTION 'Acceso denegado: Solo el Administrador General de Furia Menor tiene autorización para registrar árbitros oficiales.';
    END IF;

    -- 2. Validar que el correo no esté registrado
    IF EXISTS (SELECT 1 FROM users WHERE email = LOWER(TRIM(p_email))) THEN
        RAISE EXCEPTION 'El correo electrónico % ya se encuentra registrado en el sistema.', p_email;
    END IF;

    -- 3. Insertar el nuevo árbitro
    INSERT INTO users (
        email,
        full_name,
        role,
        club_id,
        phone,
        cedula,
        is_active
    ) VALUES (
        LOWER(TRIM(p_email)),
        p_full_name,
        'arbitro',
        NULL, -- Árbitros son neutrales, no tienen club_id
        p_phone,
        p_cedula,
        TRUE
    )
    RETURNING id INTO v_new_id;

    v_result := jsonb_build_object(
        'success', true,
        'id', v_new_id,
        'email', LOWER(TRIM(p_email)),
        'full_name', p_full_name,
        'role', 'arbitro',
        'colegio', p_colegio_arbitros,
        'message', 'Árbitro oficial registrado con éxito.'
    );

    RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
