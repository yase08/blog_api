CREATE OR REPLACE FUNCTION public.f_delete_post(p_post_id integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_title text;
BEGIN
    -- Check if post with given id exists
    IF NOT EXISTS (SELECT 1 FROM posts WHERE id = p_post_id) THEN
        RAISE EXCEPTION 'Post with id % not found', p_post_id;
    END IF;

    -- Get post title before deleting
    SELECT title INTO v_title FROM posts WHERE id = p_post_id;

    -- Delete post
    DELETE FROM posts WHERE id = p_post_id;

    -- Return deleted post title
    RETURN json_build_object('msg', 'Post "' || v_title || '" successfully deleted');
END;
$function$
;
