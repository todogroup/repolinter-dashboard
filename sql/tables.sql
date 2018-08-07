CREATE TABLE public.githuborgs (
    org_id integer NOT NULL,
    org_name text NOT NULL
);

CREATE SEQUENCE public."github-orgs_org_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

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
