CREATE OR REPLACE FUNCTION public.f_delete_user(p_username text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  DELETE FROM public.users WHERE username = p_username;
END;
$function$
;
