CREATE TABLE public.githuborgs (
    org_id integer NOT NULL,
    org_name text NOT NULL
);


ALTER TABLE public.githuborgs OWNER TO repolinter;

CREATE SEQUENCE public."github-orgs_org_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."github-orgs_org_id_seq" OWNER TO repolinter;


ALTER SEQUENCE public."github-orgs_org_id_seq" OWNED BY public.githuborgs.org_id;


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
