CREATE TABLE
    IF NOT EXISTS public.users (
        user_id serial NOT NULL,
        user_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
        user_account character varying(255) COLLATE pg_catalog."default" NOT NULL,
        user_avatar character varying(255) COLLATE pg_catalog."default",
        user_verified boolean,
        user_password character varying(1000) COLLATE pg_catalog."default",
        user_token text COLLATE pg_catalog."default",
        CONSTRAINT users_pkey PRIMARY KEY (user_id)
    );

CREATE TABLE
    IF NOT EXISTS public.tweets (
        tweet_id serial NOT NULL,
        tweet_text character varying(280) COLLATE pg_catalog."default" NOT NULL,
        tweet_img_url character varying(1000) COLLATE pg_catalog."default",
        user_id integer,
        CONSTRAINT tweets_pkey PRIMARY KEY (tweet_id),
        CONSTRAINT tweets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (user_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
    );

CREATE TABLE
    IF NOT EXISTS public.user_tweets (
        ut_id serial NOT NULL,
        tweet_id integer NOT NULL,
        user_id integer NOT NULL,
        ut_liked boolean DEFAULT false,
        ut_retweeted boolean DEFAULT false,
        CONSTRAINT user_tweet_pkey PRIMARY KEY (ut_id),
        CONSTRAINT tweet_fk1 FOREIGN KEY (tweet_id) REFERENCES public.tweets (tweet_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
        CONSTRAINT users_fk2 FOREIGN KEY (user_id) REFERENCES public.users (user_id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
    );