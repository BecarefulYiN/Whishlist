--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Ubuntu 17.0-1.pgdg22.04+1)
-- Dumped by pg_dump version 17.0 (Ubuntu 17.0-1.pgdg22.04+1)

-- Started on 2024-11-27 15:41:34 +0630

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
    "IsActive" boolean DEFAULT true NOT NULL
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
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 217
-- Name: TodoList_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TodoList_ID_seq" OWNED BY public."TodoList"."ID";


--
-- TOC entry 3229 (class 2604 OID 16478)
-- Name: TodoList ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoList" ALTER COLUMN "ID" SET DEFAULT nextval('public."TodoList_ID_seq"'::regclass);


--
-- TOC entry 3380 (class 0 OID 16475)
-- Dependencies: 218
-- Data for Name: TodoList; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TodoList" ("ID", "TodoItem", "Complete", "IsActive") FROM stdin;
2	Walking	f	f
3	Learning	f	f
1	Coding	f	t
\.


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 217
-- Name: TodoList_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TodoList_ID_seq"', 3, true);


--
-- TOC entry 3233 (class 2606 OID 16482)
-- Name: TodoList TodoList_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TodoList"
    ADD CONSTRAINT "TodoList_pkey" PRIMARY KEY ("ID");


-- Completed on 2024-11-27 15:41:34 +0630

--
-- PostgreSQL database dump complete
--

