CREATE OR REPLACE FUNCTION public.f_delete_tag(p_id integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  DELETE FROM public.tags WHERE id = p_id;
END;
$function$
;
