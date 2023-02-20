CREATE OR REPLACE FUNCTION public.f_create_comment(p_comment text, p_post_id integer, p_user_id integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO public.comments (comment, post_id, user_id)
    VALUES (p_comment, p_post_id, p_user_id);

END;
$function$
;
