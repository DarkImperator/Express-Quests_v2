DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id int primary key NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  director varchar(255) NOT NULL,
  year varchar(255) NOT NULL,
  color varchar(255) NOT NULL,
  duration int NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

INSERT INTO
  movies (title, director, year, color, duration)
VALUES
  (
    'Citizen Kane',
    'Orson Wells',
    '1941',
    '0',
    120
  ),
  (
    'The Godfather',
    'Francis Ford Coppola',
    '1972',
    '1',
    180
  ),
  (
    'Pulp Fiction',
    'Quentin Tarantino',
    '1994',
    '1',
    180
  ),
  (
    'Apocalypse Now',
    'Francis Ford Coppola',
    '1979',
    '1',
    150
  ),
  (
    '2001 a space odyssey',
    'Stanley Kubrick',
    '1968',
    '1',
    160
  ),
  (
    'The Dark Knight',
    'Christopher Nolan',
    '2008',
    '1',
    150
  ),
  (
    'Titanique',
    'Jean Cameron',
    '1997',
    '1',
    194
  ),
  (
    'Le Parc Jurassique',
    'Stephane Spielberg',
    '1993',
    '1',
    128
  ),
  (
    'Star Wars, épisode I : La menace phantom',
    'Gorgette Lucasse',
    '1999',
    '1',
    136
  ),
  (
    "Star Wars, épisode II : L'Attack du Clone",
    'Gorgette Lucasse',
    '2002',
    '1',
    142
  ),
  (
    'Star Wars, épisode III : La revanche du Sith',
    'blooob',
    '2005',
    '1',
    140
  );

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id int primary key NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    city varchar(255) DEFAULT NULL,
    language varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  users (firstname, lastname, email, city, language)
VALUES
  (
    'John',
    'Doe',
    'john.doe@example.com',
    'Paris',
    'English'
  ),
  (
    'Valeriy',
    'Appius',
    'valeriy.appius@example.com',
    'Moscow',
    'Russian'
  ),
  (
    'Ralf',
    'Geronimo',
    'ralf.geronimo@example.com',
    'New York',
    'Italian'
  ),
  (
    'Maria',
    'Iskandar',
    'maria.iskandar@example.com',
    'New York',
    'German'
  ),
  (
    'Jane',
    'Doe',
    'jane.doe@example.com',
    'London',
    'English'
  ),
  (
    'Johanna',
    'Martino',
    'johanna.martino@example.com',
    'Milan',
    'Spanish'
  ),
  (
    'Luc',
    'Courtleciel',
    'luc.courtleciel@alliance_rebelle.com',
    'Tatooine',
    'Basic'
  ),
  (
    'Elliane',
    'Sattler',
    'elliane.sattler@departement_paleobotanique.com',
    'Milwookee',
    'François'
  ),
  (
    'Allan',
    'Grant',
    'allan.grant@departement_dinosaures.com',
    'Milwookee',
    'English'
  ),
  (
    'Dark',
    'Vador',
    'dark.vador@empire_galactique.com',
    'Paris',
    'basic'
  ),
  (
    'Darky',
    'Vadore',
    'darky.vadore@empire_galactique.com',
    'Death Star',
    'basic, kill childrens, English'
  ),
  (
    'Sombre',
    'Père',
    'sombre.père@empire_galactique.com',
    'Death Star',
    'base,tuer enfant, manger de la lave bien chaudex ^^'
  ),
  (
    'Sheev',
    'Palpatine',
    'Sheev.Palpatine@senatgalactique.unv',
    'Coruscant',
    'basic, Force, force'
  ),
  (
    'Ashoka',
    'Tano',
    'ashoka.tano@rebellion.reb',
    'Lothal',
    'basic, Force'
  );
