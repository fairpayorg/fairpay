CREATE TABLE public.users
(
  "_id" serial,
  "linkedin_user_id" varchar,
  "name" varchar,
  "company_id" bigint,
  "job_title" varchar,
  "salary" bigint,
  "sexuality" varchar,
  "age" integer,
  "gender" varchar,
  "race" varchar,
  "city" varchar,
  "state" varchar,
  "zipcode" integer,
  "email" varchar,
  "oauthtoken" varchar,
  "refreshtoken" varchar,
  "expiresin" integer,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
)
WITH (
  OIDS=FALSE
);

CREATE TABLE public.salary
(
  "_id" serial,
  "user_id" bigint,
  "company_id" bigint,
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

ALTER TABLE public.users CONSTRAINT "users_fk0" FOREIGN KEY
("company_id") REFERENCES public.company
("_id")
ALTER TABLE public.users CONSTRAINT "users_fk1" FOREIGN KEY
("salary") REFERENCES public.salary
("_id")

ALTER TABLE public.salary CONSTRAINT "salary_fk0" FOREIGN KEY
("user_id") REFERENCES public.users
("_id")
ALTER TABLE public.salary CONSTRAINT "salary_fk1" FOREIGN KEY
("company_id") REFERENCES public.company
("_id")