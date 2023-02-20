CREATE OR REPLACE FUNCTION public.f_update_user(p_user text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_user json;
  v_id INTEGER;
BEGIN
  v_user := p_user::json;
  v_id := (v_user ->> 'id')::INTEGER;

  UPDATE public.users
  SET
    username = COALESCE(v_user ->> 'username', username),
    email = COALESCE(v_user ->> 'email', email),
    password = COALESCE(v_user ->> 'password', password),
    avatar = COALESCE(v_user ->> 'avatar', avatar)
  WHERE id = v_id;
END;
$function$
;
