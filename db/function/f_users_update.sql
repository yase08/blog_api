CREATE OR REPLACE FUNCTION public.f_users_update(p_id integer, p_username character varying, p_password character varying, p_email character varying)
 RETURNS SETOF users
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_exists INTEGER;
  v_user public.users%ROWTYPE;
BEGIN
  -- Check if the user already exists
  SELECT COUNT(*) INTO v_exists FROM public.users WHERE (email = p_email OR username = p_username) AND id != p_id;
  IF v_exists > 0 THEN
    RAISE EXCEPTION 'User with the provided email or username already exists.';
  END IF;

  -- Update the user
  UPDATE public.users SET
    username = p_username,
    password = p_password,
    email = p_email,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = p_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with id % does not exist.', p_id;
  END IF;

  -- Retrieve the updated user data
  SELECT * INTO v_user FROM public.users WHERE id = p_id;

  -- Return the updated user data
  RETURN NEXT v_user;
END;
$function$
;
