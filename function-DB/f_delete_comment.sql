CREATE OR REPLACE FUNCTION public.f_create_tag(p_name text)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_id integer;
BEGIN
  -- Check if tag with the same name already exists
  SELECT id INTO v_id FROM public.tags WHERE name = p_name LIMIT 1;

  -- If tag already exists, return its id
  IF v_id IS NOT NULL THEN
    RETURN v_id;
  END IF;

  -- If tag does not exist, create a new one and return its id
  INSERT INTO public.tags(name) VALUES(p_name) RETURNING id INTO v_id;

  RETURN v_id;
END;
$function$
;
