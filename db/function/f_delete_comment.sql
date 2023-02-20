CREATE OR REPLACE FUNCTION public.f_delete_comment(p_comment_id integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    DELETE FROM public.comments WHERE id = p_comment_id;
END;
$function$
;
