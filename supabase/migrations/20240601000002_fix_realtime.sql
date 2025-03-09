-- This migration fixes the previous error by removing the realtime subscription lines
-- that were causing the error because the tables were already members of the publication

-- No need to add tables to realtime publication as they are already members
-- The previous migration attempted to add them again, causing the error
