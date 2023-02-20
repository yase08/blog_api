CREATE OR REPLACE FUNCTION public.f_get_post(p_slug text)
 RETURNS posts
 LANGUAGE sql
AS $function$
  SELECT *
  FROM posts
  WHERE slug = p_slug;
$function$
;
