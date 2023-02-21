CREATE OR REPLACE FUNCTION public.f_posts_delete(p_id integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
    DELETE FROM public.posts WHERE id = p_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Post with ID % not found', p_id;
    END IF;
    
    RETURN 'Post successfully deleted';
END;
$function$
;
