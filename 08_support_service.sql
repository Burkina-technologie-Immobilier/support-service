-- =====================================================================
--  MeubleZone — support-service (fusion support + review)
--  Base : support_db  (PostgreSQL 14+)
--  Responsabilité : tickets, FAQ, chat, avis clients vérifiés.
-- =====================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------- Tickets de support ----------
CREATE TABLE tickets (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id   VARCHAR(21) NOT NULL UNIQUE,
    branch_id   UUID,
    user_id     UUID,
    full_name   VARCHAR(160) NOT NULL,
    email       VARCHAR(200) NOT NULL,
    phone       VARCHAR(40),
    category    VARCHAR(30) NOT NULL DEFAULT 'commande'
                CHECK (category IN ('commande','livraison','retour','paiement','produit','autre')),
    subject     VARCHAR(200) NOT NULL,
    message     TEXT NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'open'
                CHECK (status IN ('open','pending','resolved','closed')),
    priority    VARCHAR(10) NOT NULL DEFAULT 'normal'
                CHECK (priority IN ('low','normal','high','urgent')),
    order_id    UUID,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_tickets_user   ON tickets(user_id);
CREATE INDEX idx_tickets_branch ON tickets(branch_id);
CREATE INDEX idx_tickets_status ON tickets(status);

CREATE TABLE ticket_messages (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id   VARCHAR(21) NOT NULL UNIQUE,
    ticket_id   UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('customer','agent')),
    sender_id   UUID,
    body        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_ticket_messages ON ticket_messages(ticket_id, created_at);

-- ---------- FAQ dynamique ----------
CREATE TABLE faq_entries (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id    VARCHAR(21) NOT NULL UNIQUE,
    category     VARCHAR(30) NOT NULL
                 CHECK (category IN ('commande','livraison','retour','paiement','produit','autre')),
    question     VARCHAR(300) NOT NULL,
    answer       TEXT NOT NULL,
    position     INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    view_count   INT NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_faq_category ON faq_entries(category);

-- ---------- Chat en direct ----------
CREATE TABLE chat_sessions (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id   VARCHAR(21) NOT NULL UNIQUE,
    user_id     UUID,
    agent_id    UUID,
    status      VARCHAR(20) NOT NULL DEFAULT 'open'
                CHECK (status IN ('open','active','closed')),
    started_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    closed_at   TIMESTAMPTZ
);

CREATE TABLE chat_messages (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id   VARCHAR(21) NOT NULL UNIQUE,
    session_id  UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('customer','agent','bot')),
    body        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_chat_messages ON chat_messages(session_id, created_at);

-- ---------- Avis clients (ex review-service) ----------
CREATE TABLE reviews (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id     VARCHAR(21) NOT NULL UNIQUE,
    branch_id     UUID NOT NULL,
    product_id    UUID NOT NULL,
    user_id       UUID NOT NULL,
    author_name   VARCHAR(120),
    rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title         VARCHAR(160),
    body          TEXT,
    is_verified   BOOLEAN NOT NULL DEFAULT FALSE,
    order_id      UUID,
    helpful_count INT NOT NULL DEFAULT 0,
    status        VARCHAR(20) NOT NULL DEFAULT 'published'
                  CHECK (status IN ('pending','published','rejected')),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (product_id, user_id)
);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_branch  ON reviews(branch_id);
CREATE INDEX idx_reviews_rating  ON reviews(product_id, rating);

CREATE TABLE review_photos (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    public_id  VARCHAR(21) NOT NULL UNIQUE,
    review_id  UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    url        TEXT NOT NULL,
    position   INT NOT NULL DEFAULT 0
);

CREATE TABLE review_votes (
    review_id  UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    user_id    UUID NOT NULL,
    is_helpful BOOLEAN NOT NULL,
    PRIMARY KEY (review_id, user_id)
);
