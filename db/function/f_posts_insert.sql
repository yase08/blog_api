CREATE OR REPLACE FUNCTION public.f_posts_insert(p_title character varying, p_description character varying, p_slug character varying, p_body text, p_thumbnail character varying, p_user_id integer, p_tag_id integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_result JSON;
BEGIN
    IF EXISTS (SELECT 1 FROM public.users WHERE id = p_user_id) AND EXISTS (SELECT 1 FROM public.tags WHERE id = p_tag_id) THEN
        INSERT INTO public.posts(title, description, slug, body, thumbnail, user_id, tag_id) VALUES (p_title, p_description, p_slug, p_body, p_thumbnail, p_user_id, p_tag_id)
        RETURNING to_json(ROW(id, title, description, slug, body, thumbnail, created_at, updated_at, user_id, tag_id)) INTO v_result;
    ELSE
        RAISE EXCEPTION 'Invalid user_id or tag_id';
    END IF;
    
    RETURN v_result;
END;
$function$
;
