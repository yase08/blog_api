CREATE OR REPLACE FUNCTION public.f_get_user(p_username text)
 RETURNS users
 LANGUAGE plpgsql
AS $function$
DECLARE
  user_record users;
BEGIN
  SELECT *
  INTO user_record
  FROM users
  WHERE username = p_username
  LIMIT 1;

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  RETURN user_record;
END;
$function$
;
