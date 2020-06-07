-- creates tables in our databases with relevant columns, setting their serial _id columns as the primary key

CREATE TABLE public.users
(
  "_id" serial,
  "linkedin_user_id" varchar, -- user id provided from linked in Oauth
  "name" varchar,
  "company_id" bigint, -- foreign key refers to company table _id
  "salary" bigint, -- foreign key refers to salary table _id
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
INSERT INTO public.company VALUES (1, 'Codesmith-LLC', 'Codesmith', 'Venice', 'Software Engineering Boot Camp', 'West Coast USA', '90291');

INSERT INTO public.salary VALUES (1, 1, 'Resident', 'Salary', 1, 1, 100000, 0, 0, 0, 'yes');

INSERT INTO public.users VALUES (1, 'andrew-cho-37990193', 'Andrew Cho', 1, 1, 'Straight', 36, 'male', 'asian', 'Sherman Oaks', 'California', 'andrewjcho84@gmail.com', 'oauthtoken1', 'refreshtoken1', 10000, '91411')