CREATE OR REPLACE FUNCTION public.f_posts_select(p_slug text)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_result JSON;
BEGIN
    SELECT to_json(posts) INTO v_result FROM public.posts WHERE slug = p_slug;
    
    IF v_result IS NULL THEN
        RAISE EXCEPTION 'Post with slug % not found', p_slug;
    END IF;
    
    RETURN v_result;
END;
$function$
;
