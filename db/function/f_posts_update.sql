CREATE OR REPLACE FUNCTION public.f_posts_update(p_id integer, p_title character varying, p_description character varying, p_slug character varying, p_body text, p_thumbnail character varying, p_tag_id integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_result JSON;
BEGIN
    IF EXISTS (SELECT 1 FROM public.tags WHERE id = p_tag_id) THEN
        UPDATE public.posts SET title = p_title, description = p_description, slug = p_slug, body = p_body, thumbnail = p_thumbnail, tag_id = p_tag_id, updated_at = CURRENT_TIMESTAMP WHERE id = p_id
        RETURNING to_json(ROW(id, title, description, slug, body, thumbnail, created_at, updated_at, user_id, tag_id)) INTO v_result;
    ELSE
        RAISE EXCEPTION 'Invalid tag_id';
    END IF;
    
    IF v_result IS NULL THEN
        RAISE EXCEPTION 'Post with ID % not found', p_id;
    END IF;
    
    RETURN v_result;
END;
$function$
;
