--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Ubuntu 17.0-1.pgdg22.04+1)
-- Dumped by pg_dump version 17.0 (Ubuntu 17.0-1.pgdg22.04+1)

-- Started on 2024-12-02 11:34:25 +0630

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16475)
-- Name: TodoList; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TodoList" (
    "ID" integer NOT NULL,
    "TodoItem" character varying(255) NOT NULL,
    "Complete" boolean DEFAULT false NOT NULL,
    "IsActive" boolean DEFAULT true NOT NULL,
    "userId" integer,
    description character varying(255)
);


ALTER TABLE public."TodoList" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16474)
-- Name: TodoList_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TodoList_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TodoList_ID_seq" OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 217
-- Name: TodoList_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TodoList_ID_seq" OWNED BY public."TodoList"."ID";


--
-- TOC entry 220 (class 1259 OID 16484)
-- Name: User_Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User_Account" (
    "userId" integer NOT NULL,
    "userName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public."User_Account" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16483)
-- Name: User_Account_userId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_Account_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_Account_userId_seq" OWNER TO postgres;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 219
-- Name: User_Account_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_Account_userId_seq" OWNED BY public."User_Account"."userId";


--
-- TOC entry 3234 (class 2604 OID 16478)
-- Name: TodoList ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoList" ALTER COLUMN "ID" SET DEFAULT nextval('public."TodoList_ID_seq"'::regclass);


--
-- TOC entry 3237 (class 2604 OID 16487)
-- Name: User_Account userId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User_Account" ALTER COLUMN "userId" SET DEFAULT nextval('public."User_Account_userId_seq"'::regclass);


--
-- TOC entry 3389 (class 0 OID 16475)
-- Dependencies: 218
-- Data for Name: TodoList; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TodoList" ("ID", "TodoItem", "Complete", "IsActive", "userId", description) FROM stdin;
2	Walking	f	f	\N	\N
3	Learning	f	f	\N	\N
25	testing	t	t	4	testing with description
6	swamming	f	f	\N	\N
5	Writing	f	f	\N	\N
4	Eating	f	f	\N	\N
7	gym	f	t	\N	\N
8	swimming	f	f	\N	\N
23	testing2	t	t	4	for testing
22	testing	t	t	4	for testing
1	Typing	f	t	\N	\N
9	Writing	f	t	4	\N
10	typing 	f	t	4	\N
13	eating	f	t	4	\N
14	sleeping	f	t	4	\N
11	Swimming	f	t	4	\N
12	cycling	f	t	4	\N
15	hiking	f	t	4	\N
16	playing	f	t	4	\N
20	asd	f	f	4	\N
19	asd	f	f	4	\N
18	asa	f	f	4	\N
17	asd	f	f	4	\N
24	test	f	f	4	
26	test for all 2	t	f	4	
21	coding	f	t	4	
\.


--
-- TOC entry 3391 (class 0 OID 16484)
-- Dependencies: 220
-- Data for Name: User_Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User_Account" ("userId", "userName", email, password) FROM stdin;
4	Wai	wai@gmail.com	ZDg3MDRlNGU0Mjk3MGM4MmMwODc4OGIxZTdiZGJiOWQ=
6	Oo	Oo@gmail.com	NWFiZDljMjZkZTgzMTNiM2I1ZTQzNmQ3MjdlNDM3ZDk=
7	justin	justin@gmail.com	NWFiZDljMjZkZTgzMTNiM2I1ZTQzNmQ3MjdlNDM3ZDk=
\.


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 217
-- Name: TodoList_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TodoList_ID_seq"', 26, true);


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 219
-- Name: User_Account_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_Account_userId_seq"', 7, true);


--
-- TOC entry 3239 (class 2606 OID 16482)
-- Name: TodoList TodoList_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoList"
    ADD CONSTRAINT "TodoList_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 3241 (class 2606 OID 16491)
-- Name: User_Account User_Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User_Account"
    ADD CONSTRAINT "User_Account_pkey" PRIMARY KEY ("userId");


--
-- TOC entry 3242 (class 2606 OID 16492)
-- Name: TodoList user_todo_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoList"
    ADD CONSTRAINT user_todo_fk FOREIGN KEY ("userId") REFERENCES public."User_Account"("userId") NOT VALID;


-- Completed on 2024-12-02 11:34:25 +0630

--
-- PostgreSQL database dump complete
--

