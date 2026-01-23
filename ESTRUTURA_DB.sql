-- ==================================================================================
-- VEETI - DATABASE SCHEMA (DDD / Modular Structure)
-- ==================================================================================
-- Descrição: Estrutura completa para o MVP do Veeti (SaaS Veterinário Mobile-first).
-- Tecnologias: PostgreSQL, UUIDs, Soft Deletes.
-- ==================================================================================

-- 1. CONFIGURAÇÕES INICIAIS
-- Habilitar extensão para gerar UUIDs v4
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar Enums para padronizar status (Domínio Rico)
CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'VETERINARIAN', 'ASSISTANT');
CREATE TYPE appointment_status_enum AS ENUM ('SCHEDULED', 'CONFIRMED', 'ON_WAY', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'NO_SHOW');
CREATE TYPE pet_status_enum AS ENUM ('HEALTHY', 'TREATMENT', 'CHRONIC', 'POST_OP', 'CRITICAL', 'DECEASED');
CREATE TYPE payment_status_enum AS ENUM ('PENDING', 'PAID', 'CANCELED', 'REFUNDED');
CREATE TYPE quote_status_enum AS ENUM ('DRAFT', 'SENT', 'APPROVED', 'REJECTED', 'EXPIRED');

-- ==================================================================================
-- MÓDULO 1: IAM (Identity & Access Management)
-- ==================================================================================

-- Tabela de Usuários (Autenticação)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role_enum DEFAULT 'VETERINARIAN',
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de Veterinários (Perfil Profissional)
CREATE TABLE veterinarians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE, -- 1:1 com users

    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    crmv VARCHAR(20) NOT NULL,
    crmv_uf CHAR(2) NOT NULL,
    specialty VARCHAR(100),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_vet_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==================================================================================
-- MÓDULO 2: GESTÃO DE CLIENTES (Tutors & Pets)
-- ==================================================================================

-- Tutores (Clientes)
CREATE TABLE tutors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    veterinarian_id UUID NOT NULL, -- O tutor pertence à carteira deste vet (MVP)

    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100),
    cpf VARCHAR(14),
    notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_tutor_vet FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

-- Endereços (Logística e Roteirização)
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL,

    label VARCHAR(50) DEFAULT 'Casa', -- Ex: Casa, Trabalho
    zip_code VARCHAR(10),
    street VARCHAR(255) NOT NULL,
    number VARCHAR(20),
    complement VARCHAR(100),
    neighborhood VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL,

    -- Geolocalização para o mapa
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_address_tutor FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE
);

-- Pacientes (Pets)
CREATE TABLE pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL,

    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL, -- Canino, Felino
    breed VARCHAR(50), -- Raça
    gender VARCHAR(10), -- Macho/Fêmea
    birth_date DATE,
    weight DECIMAL(5,2), -- Peso atual

    clinical_status pet_status_enum DEFAULT 'HEALTHY',
    microchip_number VARCHAR(50),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_pet_tutor FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE
);

-- ==================================================================================
-- MÓDULO 3: OPERAÇÃO E AGENDA
-- ==================================================================================

-- Agendamentos
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    veterinarian_id UUID NOT NULL,
    pet_id UUID NOT NULL,
    address_id UUID, -- Local do atendimento (pode ser nulo se for na clínica/remoto)

    date TIMESTAMP NOT NULL,
    duration_minutes INT DEFAULT 60,
    status appointment_status_enum DEFAULT 'SCHEDULED',

    check_in_at TIMESTAMP,
    check_out_at TIMESTAMP,
    notes TEXT, -- "Cão agressivo", "Trazer vacina"

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_app_vet FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id),
    CONSTRAINT fk_app_pet FOREIGN KEY (pet_id) REFERENCES pets(id),
    CONSTRAINT fk_app_address FOREIGN KEY (address_id) REFERENCES addresses(id)
);

-- ==================================================================================
-- MÓDULO 4: CLÍNICO (Prontuário Eletrônico)
-- ==================================================================================

-- Histórico Clínico (Consultas)
CREATE TABLE medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID UNIQUE, -- Opcional: pode criar prontuário sem agendamento
    pet_id UUID NOT NULL,
    veterinarian_id UUID NOT NULL,

    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    complaint TEXT, -- Queixa principal
    history TEXT, -- Anamnese
    physical_exam TEXT, -- Exame físico
    diagnosis TEXT,
    treatment TEXT,

    weight_at_exam DECIMAL(5,2), -- Histórico de peso

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_record_app FOREIGN KEY (appointment_id) REFERENCES appointments(id),
    CONSTRAINT fk_record_pet FOREIGN KEY (pet_id) REFERENCES pets(id),
    CONSTRAINT fk_record_vet FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

-- Vacinas (Controle de imunização)
CREATE TABLE vaccines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL,
    veterinarian_id UUID,

    name VARCHAR(100) NOT NULL,
    batch VARCHAR(50), -- Lote
    manufacturer VARCHAR(100), -- Fabricante
    application_date DATE NOT NULL,
    next_due_date DATE, -- Data do reforço (Gatilho para lembrete)

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_vaccine_pet FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Alertas Clínicos (Ex: Alergias)
CREATE TABLE clinical_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pet_id UUID NOT NULL,

    type VARCHAR(50) NOT NULL, -- ALLERGY, BEHAVIOR, CHRONIC
    description VARCHAR(255) NOT NULL,
    severity VARCHAR(20) DEFAULT 'HIGH', -- LOW, MEDIUM, HIGH

    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_alert_pet FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

-- Anexos (Exames, Fotos)
CREATE TABLE attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medical_record_id UUID, -- Pode estar ligado a um atendimento
    pet_id UUID NOT NULL,

    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    description VARCHAR(255),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_attach_record FOREIGN KEY (medical_record_id) REFERENCES medical_records(id),
    CONSTRAINT fk_attach_pet FOREIGN KEY (pet_id) REFERENCES pets(id)
);

-- ==================================================================================
-- MÓDULO 5: DOCUMENTOS (Receitas e Templates)
-- ==================================================================================

-- Templates de Documentos (Reutilizáveis)
CREATE TABLE document_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    veterinarian_id UUID NOT NULL,

    title VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- PRESCRIPTION, INSTRUCTIONS, ANAMNESIS
    content TEXT NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT fk_template_vet FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

-- Receitas / Prescrições
CREATE TABLE prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID,
    veterinarian_id UUID NOT NULL,
    pet_id UUID NOT NULL,

    code VARCHAR(20) UNIQUE, -- Código de validação
    notes TEXT, -- Recomendações gerais
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_presc_app FOREIGN KEY (appointment_id) REFERENCES appointments(id),
    CONSTRAINT fk_presc_vet FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id),
    CONSTRAINT fk_presc_pet FOREIGN KEY (pet_id) REFERENCES pets(id)
);

-- Itens da Receita
CREATE TABLE prescription_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prescription_id UUID NOT NULL,

    medication_name VARCHAR(150) NOT NULL,
    dosage VARCHAR(255) NOT NULL, -- Ex: "1 cp a cada 8h"
    quantity VARCHAR(50), -- "1 caixa"
    duration VARCHAR(50), -- "7 dias"

    CONSTRAINT fk_item_presc FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE
);

-- ==================================================================================
-- MÓDULO 6: FINANCEIRO E VENDAS
-- ==================================================================================

-- Catálogo de Serviços
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    veterinarian_id UUID NOT NULL,

    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,

    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_service_vet FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id)
);

-- Orçamentos (Quotes)
CREATE TABLE quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    veterinarian_id UUID NOT NULL,
    tutor_id UUID NOT NULL,

    status quote_status_enum DEFAULT 'DRAFT',
    total_amount DECIMAL(10, 2) DEFAULT 0,
    expiration_date DATE,
    public_token UUID DEFAULT uuid_generate_v4(), -- Para link web

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_quote_vet FOREIGN KEY (veterinarian_id) REFERENCES veterinarians(id),
    CONSTRAINT fk_quote_tutor FOREIGN KEY (tutor_id) REFERENCES tutors(id)
);

-- Itens do Orçamento
CREATE TABLE quote_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL,
    service_id UUID, -- Pode ser nulo se for item avulso customizado

    description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10, 2) DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,

    CONSTRAINT fk_qitem_quote FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
);

-- Faturas / Cobranças (Invoices)
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID, -- Pode vir de um orçamento
    tutor_id UUID NOT NULL,
    appointment_id UUID,

    total_amount DECIMAL(10, 2) NOT NULL,
    status payment_status_enum DEFAULT 'PENDING',
    payment_method VARCHAR(50), -- PIX, CARD, CASH
    paid_at TIMESTAMP,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inv_tutor FOREIGN KEY (tutor_id) REFERENCES tutors(id)
);

-- ==================================================================================
-- MÓDULO 7: AUTOMAÇÃO E NOTIFICAÇÕES
-- ==================================================================================

-- Lembretes (Vacinas, Retornos, Aniversários)
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tutor_id UUID NOT NULL,
    pet_id UUID,

    title VARCHAR(100) NOT NULL,
    message TEXT,
    type VARCHAR(50) NOT NULL, -- VACCINE, RETURN, MEDICATION
    channel VARCHAR(20) DEFAULT 'WHATSAPP',

    due_date TIMESTAMP NOT NULL, -- Quando deve ser enviado
    sent_at TIMESTAMP, -- Se null, está pendente

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_remind_tutor FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE
);

-- ==================================================================================
-- INDEXAÇÃO (Performance Optimization)
-- ==================================================================================

-- Acelerar login e buscas
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_vets_crmv ON veterinarians(crmv);

-- Acelerar buscas de clientes
CREATE INDEX idx_tutors_name ON tutors(name);
CREATE INDEX idx_pets_name ON pets(name);

-- Acelerar Agenda (CRÍTICO PARA O APP)
CREATE INDEX idx_apps_vet_date ON appointments(veterinarian_id, date);
CREATE INDEX idx_apps_status ON appointments(status);

-- Acelerar Histórico Clínico
CREATE INDEX idx_records_pet ON medical_records(pet_id);

-- Acelerar Automação de Lembretes (Para o Cron Job não varrer tudo)
CREATE INDEX idx_reminders_due_pending ON reminders(due_date) WHERE sent_at IS NULL;