CREATE TABLE public.githuborgs (
    org_id integer NOT NULL,
    org_name text NOT NULL
);


ALTER TABLE public.githuborgs OWNER TO repolinter;

--
-- Name: TABLE githuborgs; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON TABLE public.githuborgs IS 'contains org names on github.';


--
-- Name: COLUMN githuborgs.org_id; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githuborgs.org_id IS 'org_ids';


--
-- Name: COLUMN githuborgs.org_name; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githuborgs.org_name IS 'org names';


--
-- Name: github-orgs_org_id_seq; Type: SEQUENCE; Schema: public; Owner: repolinter
--

CREATE SEQUENCE public."github-orgs_org_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."github-orgs_org_id_seq" OWNER TO repolinter;

--
-- Name: github-orgs_org_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: repolinter
--

ALTER SEQUENCE public."github-orgs_org_id_seq" OWNED BY public.githuborgs.org_id;


--
-- Name: githubrepos; Type: TABLE; Schema: public; Owner: repolinter
--

CREATE TABLE public.githubrepos (
    repo_name text NOT NULL,
    full_name text NOT NULL,
    github_owner_details json,
    collaborators_url text NOT NULL,
    teams_url text,
    updated_at date,
    git_url text,
    ssh_url text,
    clone_url text NOT NULL,
    language text,
    watchers_count integer,
    open_issues_count integer NOT NULL,
    license json,
    org_name text,
    github_id integer,
    repolinter_scan text
);


ALTER TABLE public.githubrepos OWNER TO repolinter;

--
-- Name: TABLE githubrepos; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON TABLE public.githubrepos IS 'all repos from the amazon orgs';


--
-- Name: COLUMN githubrepos.repo_name; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.repo_name IS 'repository name';


--
-- Name: COLUMN githubrepos.full_name; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.full_name IS 'full_name';


--
-- Name: COLUMN githubrepos.github_owner_details; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.github_owner_details IS 'github_owner_details';


--
-- Name: COLUMN githubrepos.collaborators_url; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.collaborators_url IS 'collaborators_url';


--
-- Name: COLUMN githubrepos.teams_url; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.teams_url IS 'teams_url';


--
-- Name: COLUMN githubrepos.updated_at; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.updated_at IS 'updated_at';


--
-- Name: COLUMN githubrepos.git_url; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.git_url IS 'git_url';


--
-- Name: COLUMN githubrepos.ssh_url; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.ssh_url IS 'ssh_url';


--
-- Name: COLUMN githubrepos.clone_url; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.clone_url IS 'clone_url';


--
-- Name: COLUMN githubrepos.language; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.language IS 'language';


--
-- Name: COLUMN githubrepos.watchers_count; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.watchers_count IS 'watchers_count';


--
-- Name: COLUMN githubrepos.open_issues_count; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.open_issues_count IS 'open_issues_count';


--
-- Name: COLUMN githubrepos.license; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.license IS 'license';


--
-- Name: COLUMN githubrepos.org_name; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.org_name IS 'org_name';


--
-- Name: COLUMN githubrepos.github_id; Type: COMMENT; Schema: public; Owner: repolinter
--

COMMENT ON COLUMN public.githubrepos.github_id IS 'github_is';


--
-- Name: githuborgs org_id; Type: DEFAULT; Schema: public; Owner: repolinter
--