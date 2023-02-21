CREATE OR REPLACE FUNCTION public.f_users_select(p_id integer)
 RETURNS users
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_user public.users;
BEGIN
  SELECT * INTO v_user FROM public.users WHERE id = p_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with id % does not exist.', p_id;
  END IF;

  RETURN v_user;
END;
$function$
;
