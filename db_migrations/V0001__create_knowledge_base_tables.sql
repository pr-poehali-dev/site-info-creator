-- Создание таблиц для информационной базы знаний

-- Таблица категорий
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица подразделов
CREATE TABLE subcategories (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица информационных материалов
CREATE TABLE info_items (
    id SERIAL PRIMARY KEY,
    subcategory_id INTEGER NOT NULL REFERENCES subcategories(id),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для ускорения поиска
CREATE INDEX idx_subcategories_category_id ON subcategories(category_id);
CREATE INDEX idx_info_items_subcategory_id ON info_items(subcategory_id);
CREATE INDEX idx_info_items_tags ON info_items USING GIN(tags);

-- Вставка демо-данных
INSERT INTO categories (name, icon, sort_order) VALUES
    ('Технологии', 'Cpu', 1),
    ('Дизайн', 'Palette', 2),
    ('Маркетинг', 'TrendingUp', 3);

INSERT INTO subcategories (category_id, name, sort_order) VALUES
    (1, 'Программирование', 1),
    (1, 'Инфраструктура', 2),
    (2, 'UI/UX дизайн', 1),
    (3, 'Digital Marketing', 1);

INSERT INTO info_items (subcategory_id, title, description, tags, sort_order) VALUES
    (1, 'React и TypeScript', 'Современная разработка пользовательских интерфейсов с использованием React и строгой типизации TypeScript для создания масштабируемых приложений.', ARRAY['Frontend', 'JavaScript', 'UI/UX'], 1),
    (1, 'Python для Data Science', 'Анализ данных, машинное обучение и визуализация с помощью библиотек NumPy, Pandas, Matplotlib и scikit-learn.', ARRAY['Python', 'ML', 'Data'], 2),
    (2, 'Облачные технологии', 'Развертывание и управление приложениями в облачных платформах AWS, Azure и Google Cloud с использованием контейнеризации.', ARRAY['Cloud', 'DevOps', 'Docker'], 1),
    (3, 'Принципы минимализма', 'Создание чистых интерфейсов с максимальным вниманием к деталям, типографике и пространству. Меньше элементов — больше смысла.', ARRAY['Минимализм', 'Типографика', 'Композиция'], 1),
    (3, 'Цветовая теория', 'Психология цвета, построение палитр и создание гармоничных визуальных решений для различных типов интерфейсов.', ARRAY['Цвет', 'Палитры', 'Психология'], 2),
    (4, 'SEO оптимизация', 'Методы продвижения сайтов в поисковых системах: подбор ключевых слов, оптимизация контента, техническое SEO.', ARRAY['SEO', 'Google', 'Трафик'], 1);
