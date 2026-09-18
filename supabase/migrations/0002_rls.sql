-- Row Level Security for the 6 base tables. Only the record owner,
-- the relevant author, or a moderator/admin may read or write
-- non-public rows. Anonymous/public read is limited to mate_post
-- listing and admin_setting (outbound URLs needed by unauthenticated
-- SCR-003 visitors).

create or replace function current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from user_profile where id = auth.uid();
$$;

alter table user_profile enable row level security;
alter table mate_post enable row level security;
alter table mate_application enable row level security;
alter table user_block enable row level security;
alter table report enable row level security;
alter table admin_setting enable row level security;

-- user_profile: 본인만 열람/수정, moderator/admin은 전체 열람(신고 처리용)
create policy user_profile_select_self on user_profile
  for select using (id = auth.uid() or current_user_role() in ('moderator', 'admin'));

create policy user_profile_update_self on user_profile
  for update using (id = auth.uid());

create policy user_profile_insert_self on user_profile
  for insert with check (id = auth.uid());

-- mate_post: 목록/상세는 공개, 작성/수정/삭제는 작성자 또는 moderator/admin
create policy mate_post_select_public on mate_post
  for select using (true);

create policy mate_post_insert_author on mate_post
  for insert with check (author_id = auth.uid());

create policy mate_post_update_author_or_staff on mate_post
  for update using (author_id = auth.uid() or current_user_role() in ('moderator', 'admin'));

create policy mate_post_delete_author_or_staff on mate_post
  for delete using (author_id = auth.uid() or current_user_role() in ('moderator', 'admin'));

-- mate_application: 신청자 본인, 해당 게시글 작성자, moderator/admin만 열람
create policy mate_application_select_related on mate_application
  for select using (
    applicant_id = auth.uid()
    or current_user_role() in ('moderator', 'admin')
    or exists (
      select 1 from mate_post
      where mate_post.id = mate_application.post_id
        and mate_post.author_id = auth.uid()
    )
  );

create policy mate_application_insert_self on mate_application
  for insert with check (applicant_id = auth.uid());

create policy mate_application_update_related on mate_application
  for update using (
    current_user_role() in ('moderator', 'admin')
    or exists (
      select 1 from mate_post
      where mate_post.id = mate_application.post_id
        and mate_post.author_id = auth.uid()
    )
  );

-- user_block: 차단을 건 본인만 열람/등록/해제
create policy user_block_select_self on user_block
  for select using (blocker_id = auth.uid());

create policy user_block_insert_self on user_block
  for insert with check (blocker_id = auth.uid());

create policy user_block_delete_self on user_block
  for delete using (blocker_id = auth.uid());

-- report: 신고자 본인 또는 moderator/admin만 열람, 상태 변경은 moderator/admin만
create policy report_select_related on report
  for select using (reporter_id = auth.uid() or current_user_role() in ('moderator', 'admin'));

create policy report_insert_self on report
  for insert with check (reporter_id = auth.uid());

create policy report_update_staff on report
  for update using (current_user_role() in ('moderator', 'admin'));

-- admin_setting: 외부 URL 설정은 공개 열람(비로그인 SCR-003에서 필요), 수정은 admin만
create policy admin_setting_select_public on admin_setting
  for select using (true);

create policy admin_setting_upsert_admin on admin_setting
  for insert with check (current_user_role() = 'admin');

create policy admin_setting_update_admin on admin_setting
  for update using (current_user_role() = 'admin');
