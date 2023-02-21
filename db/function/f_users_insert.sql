CREATE OR REPLACE FUNCTION public.f_users_insert(p_username character varying, p_password character varying, p_email character varying)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_exists INTEGER;
BEGIN
  -- Check if the user already exists
  SELECT COUNT(*) INTO v_exists FROM public.users WHERE email = p_email OR username = p_username;
  IF v_exists > 0 THEN
    RAISE EXCEPTION 'User with the provided email or username already exists.';
  END IF;

  -- Insert the user
  INSERT INTO public.users (username, password, email)
  VALUES (p_username, p_password, p_email);

  return 'User successfully created!';
END;
$function$
;
