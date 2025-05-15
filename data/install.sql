-- 用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid()
);

-- 封面表
CREATE TABLE covers (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    img_description TEXT,
    img_size VARCHAR(255),
    img_url TEXT,
    llm_name VARCHAR(100),
    llm_params JSON,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    status INT,
    category_id INT
);
ALTER TABLE covers
ADD COLUMN slug VARCHAR(255) UNIQUE;

-- 订单表
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_no VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_email VARCHAR(255) NOT NULL,
    amount INT NOT NULL,
    plan VARCHAR(50),
    expired_at TIMESTAMPTZ,
    order_status SMALLINT NOT NULL,
    paied_at TIMESTAMPTZ,
    stripe_session_id VARCHAR(255),
    credits INT NOT NULL,
    currency VARCHAR(50)    
);

-- 分类表
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT,
    level INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);
-- 添加preview_image字段到分类表
ALTER TABLE categories 
ADD COLUMN preview_image VARCHAR(255);

-- 标签表
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 封面标签关联表
CREATE TABLE cover_tags (
    cover_id INTEGER REFERENCES covers(id),
    tag_id INTEGER REFERENCES tags(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cover_id, tag_id)
);

-- PDF表
CREATE TABLE pdfs (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    cover_uuid UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    uuid UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    FOREIGN KEY (cover_uuid) REFERENCES covers(uuid)
);

-- 添加外键约束
ALTER TABLE covers
ADD CONSTRAINT fk_category
    FOREIGN KEY (category_id) 
    REFERENCES categories(id);

-- 创建索引
CREATE INDEX idx_covers_category_id ON covers(category_id);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_pdfs_cover_uuid ON pdfs(cover_uuid);
