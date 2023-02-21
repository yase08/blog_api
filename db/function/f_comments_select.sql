CREATE OR REPLACE FUNCTION public.f_comments_select(p_id integer)
 RETURNS TABLE(id integer, comment text, created_at timestamp with time zone, updated_at timestamp with time zone, post_id integer, user_id integer)
 LANGUAGE plpgsql
AS $function$
begin
	IF NOT FOUND THEN
    	RAISE EXCEPTION 'Comment with id % does not exist.', p_id;
  	END IF;
    RETURN QUERY
    SELECT c.id, c."comment", c.created_at, c.updated_at, c.post_id, c.user_id
    FROM public.comments c
    WHERE c.id = p_id;
END;
$function$
;
