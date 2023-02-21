CREATE OR REPLACE FUNCTION public.f_comments_delete(p_id integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Cek apakah komentar dengan ID tertentu sudah ada
    IF NOT EXISTS (SELECT 1 FROM public.comments WHERE id = p_id) THEN
        RAISE EXCEPTION 'Comment not found';
    END IF;
    
    DELETE FROM public.comments
    WHERE id = p_id;
    return 'Tag successfully deleted!';
END;
$function$
;
