-- creates tables in our databases with relevant columns, setting their serial _id columns as the primary key

CREATE TABLE public.users
(
  "_id" serial,
  "linkedin_user_id" varchar,
  "name" varchar,
  "company_id" bigint,
  "salary" bigint,
  "sexuality" varchar,
  "age" integer,
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
)
WITH (
  OIDS=FALSE
);

CREATE TABLE public.salary
(
  "_id" serial,
  "company_id" bigint,
  "job_title" varchar,
  "employee_type" varchar,
  "years_at_company" integer,
  "years_of_experience" integer,
  "base_salary" integer,
  "annual_bonus" integer,
  "stock_options" integer,
  "signing_bonus" integer,
  "full_time_status" varchar,
  CONSTRAINT "salary_pk" PRIMARY KEY ("_id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE public.company
(
  "_id" serial,
  "linkedin_id" varchar,
  "name" varchar,
  "city" varchar,
  "industry" varchar,
  "region" varchar,
  "zipcode" integer,
  CONSTRAINT "company_pk" PRIMARY KEY ("_id")
)
WITH (
  OIDS=FALSE
);

-- creates foreign key links, company table must be filled first, then salary table, and lastly users table
ALTER TABLE public.users ADD CONSTRAINT "users_fk0" FOREIGN KEY ("company_id") REFERENCES public.company("_id");
ALTER TABLE public.users ADD CONSTRAINT "users_fk1" FOREIGN KEY ("salary") REFERENCES public.salary("_id");

ALTER TABLE public.salary ADD CONSTRAINT "salary_fk0" FOREIGN KEY ("company_id") REFERENCES public.company("_id");

-- add default test data starting with company table
INSERT INTO public.company VALUES (1, 'Codesmith-LLC', 'Codesmith', 'Venice', 'Software Engineering Boot Camp', 'West Coast', '90291');

INSERT INTO public.salary VALUES (1, 1, 'Resident', 'Full-Time', 1, 1, 100000, 0, 0, 0, 'yes');

INSERT INTO public.users VALUES (1, 'andrew-cho-37990193', 'Andrew Cho', 1, 1, 'Heterosexual', 36, 'male', 'asian', 'Sherman Oaks', 'California', 'andrewjcho84@gmail.com', 'oauthtoken1', 'refreshtoken1', 10000, '91411')