CREATE OR REPLACE FUNCTION public.f_update_post(p_id integer, p_title text, p_description text, p_body text, p_tag_id integer, p_thumbnail text, p_slug text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE public.posts
    SET
        title = p_title,
        description = p_description,
        body = p_body,
        tag_id = p_tag_id,
        thumbnail = p_thumbnail,
        slug = p_slug
    WHERE id = p_id;
END;
$function$
;
