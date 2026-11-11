# Database schema

Migration: supabase/migrations/202611110001_profiles.sql.

profiles: id UUID primary key referencing auth.users with cascading deletion; unique username 3-24 lowercase letters/digits/underscore starting with a letter; pen_name 1-80 characters; bio up to 500 characters; nullable reserved avatar_path; created_at and server-managed updated_at timestamps.

The primary key and unique username provide lookup indexes. Reserved handles are blocked both in Zod and a database check. Profiles are created on explicit setup, so unverified signups do not need fabricated handles or unsafe metadata triggers.

Public profile fields contain no email, password, tokens or private journal data. Public reads are intentional. Authenticated insert and update require auth.uid() = id. Column grants prevent identity/timestamp/avatar changes. Delete is not exposed in Phase 1. A restricted-search-path trigger maintains updated_at.

Before launch: apply migration to a test project, create two verified accounts, confirm public reads, own insert/update, duplicate-handle failure, reserved-handle failure, spoofed-id insert denial and cross-user update denial. These checks need a real configured database and must not be described as executed locally.
