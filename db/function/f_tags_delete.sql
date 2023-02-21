CREATE OR REPLACE FUNCTION public.f_tags_delete(p_id integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Delete the user
  DELETE FROM public.tags WHERE id = p_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Tags with id % does not exist.', p_id;
  END IF;

  return 'Tag successfully deleted!';
END;
$function$
;
