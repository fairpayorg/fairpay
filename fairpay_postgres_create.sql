-- creates tables in our databases with relevant columns, setting their serial _id columns as the primary key
-- TO RUN, SWITCH TO TOP LEVEL DIRECTORY 
-- INVOKE: psql -d <DB URI> -f fairpay_postgres_create.sql

CREATE TABLE public.users (
  "_id" serial,
  "linkedin_user_id" varchar, -- user id provided from linked
  "image_url" varchar,
  "name" varchar,
  "company_id" bigint, -- foreign key refers to company table _id
  "salary" bigint, -- foreign key refers to salary table _id
  "sexuality" varchar,
  "age" varchar,
  "gender" varchar,
  "race" varchar,
  "city" varchar,
  "state" varchar,
  "zipcode" varchar,
  "email" varchar,
  "oauthtoken" varchar,
  "refreshtoken" varchar,
  "expiresin" integer,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id"),
  CONSTRAINT "unique_linkedin_user_id" UNIQUE ("linkedin_user_id") -- sets the linkedin_user_id as a unique identifier this is needed because ?
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.salary (
  "_id" serial,
  "company_id" bigint, -- foreign key refers to company table _id
  "job_title" varchar, -- job title at company
  "employee_type" varchar, -- salary or hourly
  "years_at_company" integer,
  "years_of_experience" integer,
  "base_salary" integer,
  "annual_bonus" integer,
  "stock_options" integer,
  "signing_bonus" integer,
  "full_time_status" varchar,
  "active" boolean,
  CONSTRAINT "salary_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.company (
  "_id" serial,
  "linkedin_id" varchar, -- company name given to us by linkedin
  "name" varchar,
  "city" varchar,
  "industry" varchar,
  "region" varchar,
  "zipcode" varchar,
  CONSTRAINT "company_pk" PRIMARY KEY ("_id"),
  CONSTRAINT "unique_linkedin_id" UNIQUE ("linkedin_id")
) WITH (
  OIDS=FALSE
);

-- 
ALTER TABLE public.users ADD CONSTRAINT "users_fk0" FOREIGN KEY ("company_id") REFERENCES public.company("_id");
ALTER TABLE public.users ADD CONSTRAINT "users_fk1" FOREIGN KEY ("salary") REFERENCES public.salary("_id");
ALTER TABLE public.salary ADD CONSTRAINT "salary_fk0" FOREIGN KEY ("company_id") REFERENCES public.company("_id");

-- add default test data starting with company table
INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) VALUES ('Codesmith-LLC', 'Codesmith', 'Venice', 'Software Engineering Boot Camp', 'West Coast USA', '90291');
INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) VALUES ('Microsoft, Inc', 'Microsoft', 'Redmond', 'Software', 'Worldwide', '98052');
INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) VALUES ('Google, Inc', 'Google', 'Mountain View', 'Technology', 'Worldwide', '94043');
INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) VALUES ('Facebook, Inc', 'Facebook', 'Menlo Park', 'Social Media', 'Worldwide', '94025');
INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) VALUES ('Apple, Inc', 'Apple', 'Cupertino', 'Consumer Electronics', 'Worldwide', '95014');
INSERT INTO company (linkedin_id, name, city, industry, region, zipcode) VALUES ('Twitter, Inc', 'Twitter', 'San Francisco', 'Social Media', 'Worldwide', '94103'); 

INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (1, 'Resident', 'Salary', 1, 1, 100000, 0, 0, 0, 'yes', 'true');
INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (2, 'Software Engineer', 'Salary', 1, 1, 120000, 20000, 0, 10000, 'yes', 'true');
INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (3, 'Software Engineer', 'Salary', 1, 1, 130000, 20000, 0, 10000, 'yes', 'true');
INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (2, 'Software Developer', 'Salary', 1, 1, 110000, 15000, 0, 5000, 'yes', 'true');
INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (3, 'Software Developer', 'Salary', 1, 1, 140000, 10000, 0, 15000, 'yes', 'true');
INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (2, 'Mobile Developer', 'Hourly', 1, 1, 125000, 15000, 0, 14000, 'yes', 'true');
INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (3, 'Mobile Developer', 'Hourly', 1, 1, 115000, 10000, 0, 16000, 'yes', 'true');
INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (2, 'Software Engineer', 'Salary', 1, 1, 150000, 10000, 0, 10000, 'yes', 'true');
INSERT INTO salary (company_id, job_title, employee_type, years_at_company, years_of_experience, base_salary, annual_bonus, stock_options, signing_bonus, full_time_status, active) VALUES (2, 'Software Engineer', 'Salary', 1, 1, 144000, 12000, 0, 11000, 'yes', 'true');

INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('andrew-cho-37990193', 'Andrew Cho', 1, 1, 'Straight', '36 - 50', 'male', 'asian', 'Sherman Oaks', 'California', 'andrewjcho84@gmail.com', 'oauthtoken1', 'refreshtoken1', 10000, '91411');
INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('carlos-perez-01894592', 'Carlos Perez', 2, 2, 'Straight', '18 - 35', 'male', 'hispanic', 'Santa Monica', 'California', 'crperez@gmail.com', 'oauthtoken2', 'refreshtoken2', 10000, '90404');
INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('saejin-kang-98165483', 'Saejin Kang', 3, 3, 'Straight', '18 - 35', 'male', 'asian', 'Glendale', 'California', 'saejin.kang1004@gmail.com', 'oauthtoken3', 'refreshtoken3', 10000, '91201');
INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('aaron-bumanglag-95165447', 'Aaron Bumanglag', 2, 4, 'Straight', '18 - 35', 'male', 'asian', 'Gardena', 'California', 'aaron.k.bumanglag@gmail.com', 'oauthtoken4', 'refreshtoken4', 10000, '90248');
INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('tyler-sullberg-19847523', 'Tyler Sullberg', 3, 5, 'Straight', '18 - 35', 'male', 'caucasian', 'Los Angeles', 'California', 'tysullberg@gmail.com', 'oauthtoken5', 'refreshtoken5', 10000, '90008');
INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('reid-klarsfeld-09845136', 'Reid Klarsfeld', 2, 6, 'Straight', '18 - 35', 'male', 'caucasian', 'Venice', 'California', 'reidklarsfeld@gmail.com', 'oauthtoken6', 'refreshtoken6', 10000, '90292');
INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('vivian-cermeno-76589495', 'Vivan Cermeno', 3, 7, 'Straight', '18 - 35', 'female', 'hispanic', 'Rowland Heights', 'California', 'viviancermeno@gmail.com', 'oauthtoken7', 'refreshtoken7', 10000, '91748');
INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('bren-yamaguchi-56179413', 'Bren Yamaguchi', 2, 8, 'Straight', '18 - 35', 'male', 'asian', 'Torrance', 'California', 'brenyamaguchi@gmail.com', 'oauthtoken8', 'refreshtoken8', 10000, '90505');
INSERT INTO users (linkedin_user_id, name, company_id, salary, sexuality, age, gender, race, city, state, email, oauthtoken, refreshtoken, expiresin, zipcode) VALUES ('stephanie-wood-76123485', 'Stephanie Wood', 2, 35, 'Straight', '36 - 50', 'female', 'caucasian', 'Long Beach', 'California', 'stephaniewood@gmail.com', 'oauthtoken9', 'refreshtoken9', 10000, '90814');

SELECT setval('public.users__id_seq', 10, false);
SELECT setval('public.salary__id_seq', 10, false);
SELECT setval('public.company__id_seq', 7, false);

