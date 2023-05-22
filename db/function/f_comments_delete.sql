CREATE OR REPLACE FUNCTION public.f_comments_delete(p_slug text, p_id integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Cek apakah komentar dengan slug dan ID tertentu sudah ada
    IF NOT EXISTS (
        SELECT 1 FROM public.comments c
        JOIN public.posts p ON p.id = c.post_id
        WHERE p.slug = p_slug AND c.id = p_id
    ) THEN
        RAISE EXCEPTION 'Comment not found';
    END IF;
    
    DELETE FROM public.comments c
    USING public.posts p
    WHERE p.slug = p_slug AND c.id = p_id AND c.post_id = p.id;
    return 'Comment successfully deleted!';
END;
$function$
;
