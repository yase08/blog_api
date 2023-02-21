CREATE OR REPLACE FUNCTION public.f_tags_select_all()
 RETURNS TABLE(id integer, name character varying, created_at timestamp with time zone, updated_at timestamp with time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY SELECT * FROM public.tags;
END;
$function$
;
