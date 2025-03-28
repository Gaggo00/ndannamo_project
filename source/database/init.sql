CREATE TABLE cities (
	id BIGINT PRIMARY KEY,
	name TEXT,
	country TEXT,
	iso TEXT,
	latitude NUMERIC,
	longitude NUMERIC,
	image TEXT
);

COPY cities
FROM '/docker-entrypoint-initdb.d/cities.csv'
DELIMITER ','
CSV HEADER;