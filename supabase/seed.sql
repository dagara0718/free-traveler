-- 개발/E2E 테스트용 최소 시드 데이터. 실 개인정보를 포함하지 않는다.
-- 로컬 Supabase(`supabase start`) 환경에서만 실행한다.

insert into auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, aud, role)
values
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'seed-member@example.com', crypt('seed-password-1', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'seed-applicant@example.com', crypt('seed-password-2', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'seed-admin@example.com', crypt('seed-password-3', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', 'authenticated', 'authenticated')
on conflict (id) do nothing;

insert into user_profile (id, display_name, role, is_adult, is_adult_confirmed_at)
values
  ('00000000-0000-0000-0000-000000000001', '시드작성자', 'member', true, now()),
  ('00000000-0000-0000-0000-000000000002', '시드신청자', 'member', true, now()),
  ('00000000-0000-0000-0000-000000000003', '시드관리자', 'admin', true, now())
on conflict (id) do nothing;

insert into mate_post (id, author_id, title, country_code, region, start_date, end_date, headcount, style, description, status, safety_ack)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '오사카 3박 4일 같이 다니실 분', 'JP', '오사카', '2027-01-10', '2027-01-13', 3, '먹방·쇼핑', '오사카 도톤보리·구로몬시장 위주로 여유롭게 다닐 동행을 찾습니다.', 'recruiting', true)
on conflict (id) do nothing;

insert into mate_application (id, post_id, applicant_id, message, status)
values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '같은 일정으로 참여하고 싶습니다. 잘 부탁드려요!', 'pending')
on conflict (id) do nothing;

insert into report (id, reporter_id, target_type, target_id, reason, status)
values
  ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'mate_post', '10000000-0000-0000-0000-000000000001', '연락처 정보가 게시글 설명에 포함되어 있습니다.', 'open')
on conflict (id) do nothing;

insert into admin_setting (key, value, updated_by)
values
  ('outbound_flight_url_template', '{"template": "https://www.google.com/travel/flights?q=flights"}', '00000000-0000-0000-0000-000000000003'),
  ('outbound_hotel_url_template', '{"template": "https://www.google.com/travel/hotels"}', '00000000-0000-0000-0000-000000000003')
on conflict (key) do nothing;
