CREATE OR REPLACE FUNCTION public.f_get_email(p_email text)
 RETURNS users
 LANGUAGE plpgsql
AS $function$
DECLARE
	user_record users;
BEGIN
	SELECT *
	INTO user_record
	FROM users
	WHERE email = p_email
	LIMIT 1;

	RETURN user_record;
END;
$function$
;
