CREATE TABLE public."facebook_user"
(
   id character varying(255),
   api_type character varying(50),
   token text,
   email character varying(255),
   name character varying(255),
   created_at timestamp with time zone DEFAULT now(),
   CONSTRAINT user_pkey PRIMARY KEY (id)
)
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public."facebook_user"
  OWNER TO postgres;
