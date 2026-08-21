CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (first_name, last_name, age, email) VALUES
('Lucas', 'Bernard', 16, 'lucas.bernard@example.com'),
('Emma', 'Thomas', 18, 'emma.thomas@example.com'),
('Louis', 'Petit', 15, 'louis.petit@example.com'),
('Chloé', 'Robert', 19, 'chloe.robert@example.com'),
('Gabriel', 'Richard', 17, 'gabriel.richard@example.com'),
('Jade', 'Durand', 20, 'jade.durand@example.com'),
('Jules', 'Dubois', 16, 'jules.dubois@example.com'),
('Léa', 'Moreau', 18, 'lea.moreau@example.com'),
('Hugo', 'Laurent', 15, 'hugo.laurent@example.com'),
('Manon', 'Simon', 19, 'manon.simon@example.com'),
('Arthur', 'Michel', 17, 'arthur.michel@example.com'),
('Inès', 'Lefebvre', 20, 'ines.lefebvre@example.com'),
('Nathan', 'Roux', 16, 'nathan.roux@example.com'),
('Camille', 'David', 18, 'camille.david@example.com'),
('Léo', 'Bertrand', 15, 'leo.bertrand@example.com'),
('Sarah', 'Morel', 19, 'sarah.morel@example.com'),
('Tom', 'Fournier', 17, 'tom.fournier@example.com'),
('Eva', 'Girard', 20, 'eva.girard@example.com'),
('Clément', 'Bonnet', 16, 'clement.bonnet@example.com'),
('Zoé', 'Dupont', 18, 'zoe.dupont@example.com'),
('Enzo', 'Fontaine', 15, 'enzo.fontaine@example.com'),
('Mia', 'Rousseau', 19, 'mia.rousseau@example.com')
ON CONFLICT (email) DO NOTHING;