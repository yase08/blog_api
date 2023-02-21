CREATE OR REPLACE FUNCTION public.f_comments_insert(p_comment text, p_post_id integer, p_user_id integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Cek apakah post_id dan user_id valid
    IF NOT EXISTS (SELECT 1 FROM public.posts WHERE id = p_post_id) THEN
        RAISE EXCEPTION 'Post not found';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = p_user_id) THEN
        RAISE EXCEPTION 'User not found';
    END IF;
    
    INSERT INTO public.comments ("comment", post_id, user_id)
    VALUES (p_comment, p_post_id, p_user_id);
    
    RETURN 'Comment successfully created';
END;
$function$
;
