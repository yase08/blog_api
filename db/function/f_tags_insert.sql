CREATE OR REPLACE FUNCTION public.f_tags_insert(tag_name character varying)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check if tag with the same name already exists
    IF EXISTS (
        SELECT 1 FROM public.tags WHERE name = tag_name
    ) THEN
        RAISE EXCEPTION 'Tag with the same name already exists';
    END IF;

    INSERT INTO public.tags (name) VALUES (tag_name);
    RETURN 'Tag successfully added';
END;
$function$
;
