CREATE OR REPLACE FUNCTION public.f_create_post(p_title text, p_description text, p_body text, p_tag_id integer, p_thumbnail text, p_user_id integer, p_slug text)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
v_id integer;
BEGIN
INSERT INTO public.posts (
title,
description,
body,
tag_id,
thumbnail,
user_id,
slug
) VALUES (
p_title,
p_description,
p_body,
p_tag_id,
p_thumbnail,
p_user_id,
p_slug
)
RETURNING id INTO v_id;
IF v_id IS NULL THEN
    RAISE EXCEPTION 'Failed to create post';
END IF;

RETURN v_id;
EXCEPTION WHEN OTHERS THEN
RAISE EXCEPTION 'Failed to create post: %', SQLERRM;
END;
$function$
;
