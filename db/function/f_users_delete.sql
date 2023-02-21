CREATE OR REPLACE FUNCTION public.f_users_delete(p_id integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Delete the user
  DELETE FROM public.users WHERE id = p_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with id % does not exist.', p_id;
  END IF;

  return 'User successfully deleted!';
END;
$function$
;
